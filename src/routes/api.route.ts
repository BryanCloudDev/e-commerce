import { Router } from 'express'
import { ApiController } from '../controllers'

export class ApiRoute {
  public readonly router = Router()

  constructor(private readonly apiController = new ApiController()) {
    this._initializeRoutes()
  }

  private _initializeRoutes(): void {
    this._ping()
  }

  private _ping(): void {
    this.router.get('/', this.apiController.healthCheck)
  }
}
