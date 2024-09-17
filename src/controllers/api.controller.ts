import { type Request, type Response } from 'express'
import { HttpStatusCodes } from '../enums'

export class ApiController {
  public healthCheck(req: Request, res: Response) {
    return res.status(HttpStatusCodes.OK).json({
      message: 'pong'
    })
  }
}
