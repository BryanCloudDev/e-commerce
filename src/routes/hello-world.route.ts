import { Router } from 'express'
import { HelloWorldController } from '../controllers'
import { Routes } from '../enums'

export class HelloWorldRouter {
  private readonly _route = `/${Routes.HELLO}`
  public readonly router = Router()

  constructor(
    private readonly helloWorldController = new HelloWorldController()
  ) {
    this._initializeRoutes()
  }

  private _initializeRoutes(): void {
    this._helloWorld()
  }

  private _helloWorld(): void {
    this.router.get(this._route, this.helloWorldController.helloWorld)
  }
}
