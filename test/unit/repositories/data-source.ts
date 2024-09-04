import { DataSource } from 'typeorm'
import * as models from '../../../src/models'

const modelsArray = Object.values(models)

export const AppTestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:', // Uses SQLite in memory
  entities: [...modelsArray],
  synchronize: true,
  logging: false
})
