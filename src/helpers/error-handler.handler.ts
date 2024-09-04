import {
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
  GoneException,
  InternalServerErrorException
} from './errors.helper'
import { Logger } from '../config'

export const exceptionHandler = (logger: Logger, error: any) => {
  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message)
  }
  if (error instanceof UnauthorizedException) {
    throw new UnauthorizedException(error.message)
  }
  if (error instanceof ForbiddenException) {
    throw new ForbiddenException(error.message)
  }
  if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message)
  }
  if (error instanceof ConflictException) {
    throw new ConflictException(error.message)
  }
  if (error instanceof GoneException) {
    throw new GoneException(error.message)
  }
  logger.error(error.message)
  throw new InternalServerErrorException(error.message)
}
