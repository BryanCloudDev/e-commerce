import { HttpStatusCodes } from '../enums'

export abstract class HttpError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class NotFoundException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.NOT_FOUND)
    this.name = 'NotFoundException'
  }
}

export class UnauthorizedException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.UNAUTHORIZED)
    this.name = 'UnauthorizedException'
  }
}

export class ForbiddenException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.FORBIDDEN)
    this.name = 'ForbiddenException'
  }
}

export class BadRequestException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.BAD_REQUEST)
    this.name = 'BadRequestException'
  }
}

export class ConflictException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.CONFLICT)
    this.name = 'ConflictException'
  }
}

export class GoneException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.GONE)
    this.name = 'GoneException'
  }
}

export class InternalServerErrorException extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCodes.INTERNAL_SERVER_ERROR)
    this.name = 'InternalServerErrorException'
  }
}
