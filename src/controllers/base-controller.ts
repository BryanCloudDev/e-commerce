import { Response } from 'express'

export abstract class BaseController {
  public response<T>(content: T): { data: T } {
    return {
      data: content
    }
  }

  public async methodHandler(method: () => any, res: Response) {
    try {
      await method()
    } catch (error) {
      res
        .status(error.statusCode)
        .json(this.response({ message: error.message }))
    }
  }
}
