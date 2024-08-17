import { DataSource } from 'typeorm'
import * as models from '../models'

const modelsArray = Object.values(models)

const AppDataSource = new DataSource({
  database: process.env.DATABASE_NAME,
  entities: [...modelsArray],
  host: process.env.DATABASE_HOST,
  logging: false,
  migrations: [],
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  subscribers: [],
  synchronize: true,
  type: 'mysql',
  username: process.env.DATABASE_USER
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
  if (!attempts) {
    console.error(`Not able to connect to database after ${attempts} attempts`)
  }
}
