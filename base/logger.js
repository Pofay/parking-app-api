const { createLogger, format, transports } = require('winston')

module.exports = createLogger({
  format: format.combine(format.colorize({ all: false }), format.simple()),
  transports: [new transports.Console()]
})
