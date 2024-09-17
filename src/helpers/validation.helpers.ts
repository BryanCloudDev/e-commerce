import { NextFunction, Response, Request } from 'express'
import { HttpStatusCodes } from '../enums'

export const checkIfIdIsInteger = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const { id } = req.params

  if (Number.isNaN(+id)) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: {
        message: 'Id must be integer type'
      }
    })
  }

  next()
}

export const checkIfEmailIsValid = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g
  const { email } = req.params
  const cleanedInput = email.trim()

  if (!cleanedInput || !emailRegex.test(cleanedInput)) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: {
        message: 'A valid email address must be provided'
      }
    })
  }

  next()
}
