import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { Routes } from '../enums'

export class UserRouter {
  private readonly _route = `/${Routes.USER}`
  public readonly router = Router()

  constructor(private readonly userController = new UserController()) {
    this._initializeRoutes()
  }

  private _initializeRoutes(): void {
    this._createUser()
    this._findById()
    this._findByEmail()
    this._updateById()
    this._deleteById()
  }

  private _createUser(): void {
    this.router.post(`${this._route}`, this.userController.createUser)
  }

  private _findById(): void {
    this.router.get(`${this._route}/:id`, this.userController.findById)
  }

  private _findByEmail(): void {
    this.router.get(
      `${this._route}/email/:email`,
      this.userController.findByEmail
    )
  }

  private _updateById(): void {
    this.router.patch(`${this._route}/:id`, this.userController.updateById)
  }

  private _deleteById(): void {
    this.router.delete(`${this._route}/:id`, this.userController.deleteById)
  }
}
