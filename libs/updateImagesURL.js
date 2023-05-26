const fs = require('fs')
const path = require('path')

const ObjectsToCsv = require('objects-to-csv')

const settings = require('../config/settings')
const logger = require('./logger')
const AppNotion = require('./notion')
const { cloneDeep } = require('../utils/cloneDeep')
const { getValueByPath } = require('../utils/getValueByPath')
const { setValueByPath } = require('../utils/setValueByPath')

const saveToCsv = async (data, filePath) => {
  const csv = new ObjectsToCsv(data)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  await csv.toDisk(filePath, { append: true })
}

const getPage = async (appNotion, pageId) => {
  logger.info({ pageId }, 'ページ情報を取得')
  const page = await appNotion.getPage(pageId)
  return page?.data ?? null
}

const getPageBlocks = async (appNotion, page) => {
  logger.info(
    {
      pageId: page.id,
      title: getValueByPath(page, AppNotion.OBJECT_PATHS.pageTitle),
      url: getValueByPath(page, AppNotion.OBJECT_PATHS.pageURL)
    },
    'ページ詳細を取得'
  )
  const blocks = await appNotion.getPageBlocks(page.id)
  return blocks?.data ?? null
}

const updatePageImagesURL = async (notionToken, pageId, imageURLBeforeUpdate, imageURLAfterUpdate) => {
  const appNotion = new AppNotion({ auth: notionToken })

  const page = await getPage(appNotion, pageId)
  if (!page) return

  const blocks = await getPageBlocks(appNotion, page)
  if (!blocks) return

  const updatedBlocks = await updateBlocksImageURL(appNotion, page, blocks, imageURLBeforeUpdate, imageURLAfterUpdate)

  // 更新データをCSVファイルに保存
  const csvData = updatedBlocks ?? []
  if (csvData.length > 0) {
    const timestamp = new Date().toISOString().slice(0, 10)
    const filePath = `${settings.OUTPUT_CSV_FILE_DIR}/${timestamp}/page_id_${pageId}.csv`
    await saveToCsv(csvData, filePath)
  }
}

const updateBlockImageURL = async (appNotion, block, imageURLBeforeUpdate, imageURLAfterUpdate) => {
  const imageURL = appNotion.getImageURLFromBlock(block)
  if (imageURL === null) return

  const isImageURLReplacementTarget = imageURL.includes(imageURLBeforeUpdate)
  if (!isImageURLReplacementTarget) {
    logger.info({ blockId: block.id, imageURL }, '更新対象外の画像URL')
    return false
  }

  const newBlock = cloneDeep(block)
  const newImageURL = imageURL.replace(imageURLBeforeUpdate, imageURLAfterUpdate)
  setValueByPath(newBlock, AppNotion.OBJECT_PATHS.blockExternalImageURL, newImageURL)

  const requestBody = {
    [AppNotion.BLOCK_TYPES.image]: newBlock[AppNotion.BLOCK_TYPES.image],
  }
  const updated = await appNotion.updateBlock(block.id, requestBody)

  if ('error' in updated) {
    logger.error({ blockId: block.id, error: updated.error }, '画像URLの更新に失敗')
    return false
  }

  logger.info({ blockId: block.id, before: imageURL, after: newImageURL }, '画像URLを更新')

  return {
    blockId: block.id,
    imageURL: newImageURL,
  }
}

const updateBlocksImageURL = async (appNotion, page, blocks, imageURLBeforeUpdate, imageURLAfterUpdate) => {
  const imageBlocks = appNotion.filterBlocksByBlockType(blocks, AppNotion.BLOCK_TYPES.image)

  const updatedBlocks = []

  for (const block of imageBlocks) {
    const updated = await updateBlockImageURL(appNotion, block, imageURLBeforeUpdate, imageURLAfterUpdate)

    if (updated) {
      updatedBlocks.push({
        pageId: page.id,
        pageTitle: getValueByPath(page, AppNotion.OBJECT_PATHS.pageTitle),
        pageURL: getValueByPath(page, AppNotion.OBJECT_PATHS.pageURL),
        blockId: block.id,
        ...updated,
      })
    }
  }

  return updatedBlocks.length > 0 ? updatedBlocks : null
}

const updateDatabaseImagesURL = async (notionToken, databaseId, imageURLBeforeUpdate, imageURLAfterUpdate) => {
  const appNotion = new AppNotion({ auth: notionToken })

  let hasMore = true
  let startCursor

  logger.info({ databaseId }, 'データベースの全ページを取得')

  while (hasMore) {
    const params = { start_cursor: startCursor }
    const pages = await appNotion.getPages(databaseId, params)

    if ('error' in pages) {
      hasMore = false;
      break
    }

    hasMore = pages.data.has_more
    startCursor = pages.data.next_cursor

    const csvData = []

    for (const page of pages.data.results) {
      const blocks = await getPageBlocks(appNotion, page)

      if (!blocks) {
        hasMore = false
        break
      }

      const updatedBlocks = await updateBlocksImageURL(appNotion, page, blocks, imageURLBeforeUpdate, imageURLAfterUpdate)

      if (updatedBlocks) {
        csvData.push(...updatedBlocks)
      }
    }

    // 更新データをCSVファイルに保存
    if (csvData.length > 0) {
      const timestamp = new Date().toISOString().slice(0, 10)
      const filePath = `${settings.OUTPUT_CSV_FILE_DIR}/${timestamp}/database_id_${databaseId}.csv`
      await saveToCsv(csvData, filePath)
    }
  }
}

module.exports = {
  updatePageImagesURL,
  updateDatabaseImagesURL,
}
