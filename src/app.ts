import express, { type Application, Router } from 'express'
import cors from 'cors'
import { pathDoesNotExist } from './middlewares/route-not-found.middleware'
import { ApiRoute, OrderRouter, ReviewRouter, UserRouter } from './routes'
import { connectToDatabase } from './config/data-source'
import { Logger } from './config/logger'
import { env } from './config/env'
import { Routes } from './enums'

export class App {
  private readonly _apiRoute: string = `/${Routes.API}`
  private readonly _app: Application = express()
  private readonly _port: number = env.appPort
  private readonly _router: Router = Router()

  constructor(
    readonly userRouter = new UserRouter(),
    readonly apiRouter = new ApiRoute(),
    readonly orderRouter = new OrderRouter(),
    readonly reviewRouter = new ReviewRouter()
  ) {
    this._initialize()
  }

  private readonly logger = new Logger(App.name)

  private async _initialize(): Promise<void> {
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
    this._router.use(this.orderRouter.router)
    this._router.use(this.reviewRouter.router)
    this._router.use(this.userRouter.router)

    // API router where all routes will be loaded to
    this._app.use(this._apiRoute, this._router)
    // routes not found
    this._app.use(pathDoesNotExist)
  }

  public listener(): void {
    this._app.listen(this._port)
  }
}
