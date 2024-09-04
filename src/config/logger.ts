import { moment } from '../helpers'
import winston from 'winston'

const { combine, colorize, printf, timestamp } = winston.format

const customFormat = printf(({ level, message, timestamp }) => {
  const { location, message: sentMessage } = JSON.parse(message)
  console.log(location, sentMessage)

  return `[E-COMMERCE] - ${moment.formatTimestamp(timestamp)} [${level}]  [${location}]: ${sentMessage}`
})

const logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp(), colorize(), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

export class Logger {
  constructor(
    private readonly identifier: string,
    private readonly loggerWinston = logger
  ) {}

  info(message: string) {
    this.loggerWinston.info(
      JSON.stringify({
        location: this.identifier,
        message
      })
    )
  }

  error(message: string) {
    this.loggerWinston.error(
      JSON.stringify({
        location: this.identifier,
        message
      })
    )
  }
}
