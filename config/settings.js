/*
 * Get environment variables.
 *
 * Use arguments from command line if inputed, otherwise use .env file.
 */

require('dotenv').config()
const argv = require('./arguments')

const NOTION_TOKEN = argv.token ?? process.env.NOTION_TOKEN
const NOTION_DATABASE_ID = argv.databaseId ?? process.env.NOTION_DATABASE_ID
const NOTION_PAGE_ID = argv.pageId ?? process.env.NOTION_PAGE_ID

const IMAGE_URL_BEFORE_UPDATE = argv.imageURLBeforeUpdate ?? process.env.IMAGE_URL_BEFORE_UPDATE
const IMAGE_URL_AFTER_UPDATE = argv.imageURLAfterUpdate ?? process.env.IMAGE_URL_AFTER_UPDATE

const OUTPUT_CSV_FILE_DIR = argv.outputCsvFileDir ?? process.env.OUTPUT_CSV_FILE_DIR

module.exports = {
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
  NOTION_PAGE_ID,
  IMAGE_URL_BEFORE_UPDATE,
  IMAGE_URL_AFTER_UPDATE,
  OUTPUT_CSV_FILE_DIR,
}
