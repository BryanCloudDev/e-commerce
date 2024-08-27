import { DataSource } from 'typeorm'
import * as models from '../models'
import { env } from './env'

const modelsArray = Object.values(models)

const AppDataSource = new DataSource({
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

  while (count < attempts) {
    try {
      await AppDataSource.initialize()
      break
    } catch (error) {
      count++
      console.error(
        `Error connecting to the database, trying again... [${count}]`,
        `Error message: ${error.message}`
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
