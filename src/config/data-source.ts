import { DataSource } from 'typeorm'
import * as models from '../models'
import { env } from './env'
import { Logger } from './logger'

const modelsArray = Object.values(models)

export const AppDataSource = new DataSource({
  database: env.dbName,
  entities: [...modelsArray],
  host: env.dbHost,
  logging: false,
  migrations: [],
  password: env.dbPassword,
  port: env.dbPort,
  subscribers: [],
  synchronize: true,
  type: 'mysql',
  username: env.dbUser
})

export const connectToDatabase = async () => {
  const attempts = 5
  let count = 0
  const milisecondsToWait = 3000
  const logger = new Logger('Database Connection')

  while (count < attempts) {
    try {
      await AppDataSource.initialize()
      break
    } catch (error) {
      count++
      logger.error(
        `Error connecting to the database, trying again... [${count}]
        Error message: ${error.message}`
      )
      await new Promise(resolve => {
        setTimeout(resolve, milisecondsToWait)
      })
    }
  }

  if (count === attempts) {
    throw new Error(
      `Not able to connect to database after ${attempts} attempts`
    )
  }
}
