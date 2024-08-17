import { type Request, type Response } from 'express'
import { HttpStatusCodes } from '../enums'

export const pathDoesNotExist = (req: Request, res: Response) => {
  return res.status(HttpStatusCodes.OK).json({
    message: 'path does not exist'
  })
}
