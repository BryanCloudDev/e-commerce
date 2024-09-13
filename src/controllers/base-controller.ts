import { Response } from 'express'

export abstract class BaseController {
  protected response<T>(content: T): { data: T } {
    return {
      data: content
    }
  }

  protected async methodHandler(method: () => any, res: Response) {
    try {
      await method()
    } catch (error) {
      res
        .status(error.statusCode)
        .json(this.response({ message: error.message }))
    }
  }
}
