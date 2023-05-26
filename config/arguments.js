/*
 * Get arguments from command line.
 */

const minimist = require('minimist')

const options = {
  alias: {
    token: 'NOTION_TOKEN',
    databaseId: 'NOTION_DATABASE_ID',
    pageId: 'NOTION_PAGE_ID',
    imageURLBeforeUpdate: 'IMAGE_URL_BEFORE_UPDATE',
    imageURLAfterUpdate: 'IMAGE_URL_AFTER_UPDATE',
    outputCsvFileDir: 'OUTPUT_CSV_FILE_DIR',
  }
}

const argv = minimist(process.argv.slice(2), options)

module.exports = argv
