/*
 * Get environment variables.
 *
 * Use arguments from command line if inputed, otherwise use .env file.
 */

require('dotenv').config()
const argv = require('./arguments')

const NOTION_TOKEN = argv.token ?? process.env.NOTION_TOKEN
const NOTION_DATABASE_ID = argv.databaseId ?? process.env.NOTION_DATABASE_ID

const BEFORE_IMAGE_BASE_URL = process.env.BEFORE_IMAGE_BASE_URL
const AFTER_IMAGE_BASE_URL = process.env.AFTER_IMAGE_BASE_URL

const OUTPUT_CSV_FILE_DIR = argv.outputCsvFileDir ?? process.env.OUTPUT_CSV_FILE_DIR

module.exports = {
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
  BEFORE_IMAGE_BASE_URL,
  AFTER_IMAGE_BASE_URL,
  OUTPUT_CSV_FILE_DIR,
}
