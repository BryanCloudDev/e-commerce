import express, { type Application, Router } from 'express'
import cors from 'cors'
import { Routes } from './enums'
import { ApiRoute, HelloWorldRouter } from './routes'
import { pathDoesNotExist } from './middlewares/route-not-found.middleware'
import { connectToDatabase } from './config/data-source'
import { env } from './config/env'
import { Logger } from './config/logger'

export class App {
  private readonly _app: Application = express()
  private readonly _router: Router = Router()
  private readonly _apiRoute: string = `/${Routes.API}`
  private readonly _port: number = env.appPort

  constructor(
    readonly helloWorldRouter = new HelloWorldRouter(),
    readonly apiRouter = new ApiRoute()
  ) {
    this.initialize()
  }

  private readonly logger = new Logger(App.name)

  private async initialize(): Promise<void> {
    await connectToDatabase()
    this._middleware()
    this._routes()
    this.logger.info(
      `⚡️Server is running at ${env.appBaseUrl}:${this._port}${this._apiRoute}`
    )
  }

  private _middleware(): void {
    // allow the usage of json in body requests
    this._app.use(express.json())

    // allow cors
    this._app.use(cors())
  }

  private _routes(): void {
    // routes to load
    this._router.use(this.apiRouter.router)
    this._router.use(this.helloWorldRouter.router)

    // API router where all routes will be loaded to
    this._app.use(this._apiRoute, this._router)
    // routes not found
    this._app.use(pathDoesNotExist)
  }

  public listener(): void {
    this._app.listen(this._port)
  }
}
