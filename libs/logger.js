/*
 * Logger for CLI.
 *
 * @see https://github.com/pinojs/pino
 */

const pino = require('pino')
const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname,time',
      },
    },
    {
      target: 'pino/file',
      options: {
        destination: 'logs/out.log',
        mkdir: true,
      },
    },
  ]
})

const logger = pino(
  {
    errorKey: 'error',
  },
  transport,
)

module.exports = logger
