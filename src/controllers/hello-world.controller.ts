import { type Request, type Response } from 'express'
import { HelloWorldService } from '../services'
import { HttpStatusCodes } from '../enums'

export class HelloWorldController {
  constructor(private readonly helloWorldService = new HelloWorldService()) {}

  helloWorld = (req: Request, res: Response) => {
    const result = this.helloWorldService.helloWorld()

    return res.status(HttpStatusCodes.OK).json({
      result
    })
  }
}
