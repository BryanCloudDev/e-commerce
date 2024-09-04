export class NotFoundException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundException'
  }
}

export class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedException'
  }
}

export class ForbiddenException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenException'
  }
}

export class BadRequestException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestException'
  }
}

export class ConflictException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConflictException'
  }
}

export class GoneException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GoneException'
  }
}

export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InternalServerErrorException'
  }
}
