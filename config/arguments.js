/*
 * Get arguments from command line.
 */

const minimist = require('minimist')

const options = {
  alias: {
    token: 'NOTION_TOKEN',
    databaseId: 'NOTION_DATABASE_ID',
    outputCsvFileDir: 'OUTPUT_CSV_FILE_DIR',
  }
}

const argv = minimist(process.argv.slice(2), options)

module.exports = argv
