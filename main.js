/*
 * Entry point for the application.
 */

const settings = require('./config/settings')
const { updatePageImagesURL, updateDatabaseImagesURL } = require('./libs/updateImagesURL')

const main = async (notionToken, databaseId, pageId) => {
  // ページIDがあればページの画像URLを更新
  if (pageId) {
    await updatePageImagesURL(notionToken, pageId, settings.IMAGE_URL_BEFORE_UPDATE, settings.IMAGE_URL_AFTER_UPDATE)
    return
  }

  // データベースIDがあればデータベース配下のページの画像URLを更新
  if (databaseId) {
    await updateDatabaseImagesURL(notionToken, databaseId, settings.IMAGE_URL_BEFORE_UPDATE, settings.IMAGE_URL_AFTER_UPDATE)
  }
}

const notionToken = settings.NOTION_TOKEN
const databaseId = settings.NOTION_DATABASE_ID
const pageId = settings.NOTION_PAGE_ID

main(notionToken, databaseId, pageId)
