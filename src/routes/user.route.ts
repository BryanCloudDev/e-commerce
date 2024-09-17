import { NextFunction, Router, Request, Response } from 'express'
import {
  checkIfEmailIsValid,
  checkIfIdIsInteger
} from '../helpers/validation.helpers'
import { UserController } from '../controllers'
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto'
import { BaseRouter } from './base-route'
import { Routes } from '../enums'

export class UserRouter extends BaseRouter {
  private readonly _route = `/${Routes.USER}`
  public readonly router = Router()

  constructor(private readonly userController = new UserController()) {
    super()
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
    this.router.post(
      // route
      `${this._route}`,
      // section for middlewares
      [this._validate.createUser],
      // controller
      this.userController.createUser
    )
  }

  private _findById(): void {
    this.router.get(
      `${this._route}/:id`,
      [checkIfIdIsInteger],
      this.userController.findById
    )
  }

  private _findByEmail(): void {
    this.router.get(
      `${this._route}/email/:email`,
      [checkIfEmailIsValid],
      this.userController.findByEmail
    )
  }

  private _updateById(): void {
    this.router.patch(
      `${this._route}/:id`,
      [checkIfIdIsInteger, this._validate.updateById],
      this.userController.updateById
    )
  }

  private _deleteById(): void {
    this.router.delete(
      `${this._route}/:id`,
      [checkIfIdIsInteger],
      this.userController.deleteById
    )
  }

  // section for middlewares of this router
  private _validate = {
    createUser: async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { email, password, name } = req.body
      const newUser = new CreateUserDto()

      newUser.email = email
      newUser.password = password
      newUser.name = name

      await super.validateDto(newUser, res, next)
    },
    updateById: async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { email, password, name } = req.body
      const user = new UpdateUserDto()

      user.email = email
      user.password = password
      user.name = name

      await super.validateDto(user, res, next)
    }
  }
}
