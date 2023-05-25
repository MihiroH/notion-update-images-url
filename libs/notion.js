/*
 * Use Notion SDK for the Notion API.
 *
 * @see https://github.com/makenotion/notion-sdk-js
 */

const Notion = require('@notionhq/client')

const logger = require('./logger')
const { cloneDeep } = require('../utils/cloneDeep')
const { getValueByPath } = require('../utils/getValueByPath')
const PromisePoolExecutor = require('../utils/promisePoolExecutor')

class AppNotion extends Notion.Client {
  // NotionAPIのリクエスト制限は平均3回/秒
  // @see https://developers.notion.com/reference/request-limits#rate-limits
  #MAX_CONCURRENCY = 3
  #MIN_INTERVAL = 1000

  static BLOCK_TYPES = Object.freeze({
    image: 'image',
  })

  static OBJECT_PATHS = Object.freeze({
    pageTitle: 'properties.名前.title.0.plain_text',
    pageURL: 'url',
    blockImageType: `${this.BLOCK_TYPES.image}.type`,
    blockFileImageURL: `${this.BLOCK_TYPES.image}.file.url`,
    blockExternalImageURL: `${this.BLOCK_TYPES.image}.external.url`,
  })

  constructor(options) {
    super(options)

    // リクエスト制限するためのインスタンスを生成
    this.poolExecutor = new PromisePoolExecutor({
      maxConcurrency: this.#MAX_CONCURRENCY,
      minInterval: this.#MIN_INTERVAL,
    })
  }

  filterBlocksByBlockType(blocks, blockType) {
    return blocks.filter((block) => block.type === blockType)
  }

  getImageURLFromBlock(block) {
    const isImageType = block?.type === AppNotion.BLOCK_TYPES.image
    if (!isImageType) return null
    return (
      getValueByPath(block, AppNotion.OBJECT_PATHS.blockFileImageURL) ??
      getValueByPath(block, AppNotion.OBJECT_PATHS.blockExternalImageURL) ??
      null
    )
  }

  async getPages(databaseId, params = {}) {
    const query = {
      database_id: databaseId,
      ...params,
    }

    try {
      return await this.poolExecutor.execute(async () => {
        const pages = await this.databases.query(query)
        return { data: pages }
      })
    } catch (error) {
      logger.error({ databaseId, error })
      return { error }
    }
  }

  async getPage(pageId, params = {}) {
    const query = {
      page_id: pageId,
      ...params,
    }

    try {
      return await this.poolExecutor.execute(async () => {
        const page = await this.pages.retrieve(query)
        return { data: page }
      })
    } catch (error) {
      logger.error({ pageId, error })
      return { error }
    }
  }

  async getPageBlocks(pageId) {
    try {
      return await this.poolExecutor.execute(async () => {
        const blocks = await Notion.collectPaginatedAPI(this.blocks.children.list, {
          block_id: pageId,
        })
        return { data: blocks }
      })
    } catch (error) {
      logger.error({ pageId, error })
      return { error }
    }
  }

  async updateBlock(blockId, payload = {}) {
    const query = cloneDeep({
      block_id: blockId,
      ...payload,
    })

    if (AppNotion.BLOCK_TYPES.image in payload) {
      const deleteKey = AppNotion.OBJECT_PATHS.blockImageType.split('.').pop()
      delete query[AppNotion.BLOCK_TYPES.image][deleteKey]
    }

    try {
      return await this.poolExecutor.execute(async () => {
        const response = await this.blocks.update(query)
        return { data: response }
      })
    } catch (error) {
      logger.error({ blockId, error })
      return { error }
    }
  }
}

module.exports = Object.assign(AppNotion, Notion)
