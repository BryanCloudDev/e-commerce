import { NextFunction, Response } from 'express'
import { validate } from 'class-validator'
import { HttpStatusCodes } from '../enums'

export abstract class BaseRouter {
  protected async validateDto<T extends object>(
    object: T,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const errors = await validate(object)

    if (errors.length) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json(errors)
    }
    next()
  }
}
