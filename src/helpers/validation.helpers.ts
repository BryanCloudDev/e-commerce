import { NextFunction, Response } from 'express'
import { HttpStatusCodes } from '../enums'

export const checkIfIdIsInteger = (
  id: string,
  res: Response,
  next: NextFunction
): void => {
  if (Number.isNaN(+id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: {
        message: 'Id must be integer type'
      }
    })
    return
  }

  next()
}

export const checkIfEmailIsValid = (
  email: string,
  res: Response,
  next: NextFunction
): void => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g

  const cleanedInput = email.trim()

  if (!cleanedInput || !emailRegex.test(cleanedInput)) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: {
        message: 'A valid email address must be provided'
      }
    })
    return
  }

  next()
}
