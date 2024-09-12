import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

const emailAddressRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const emailAddressErrorMessage: string = [
  'At least 8 characters',
  'At least one capital letter',
  'At least one lowercase letter',
  'At least one number',
  'At least one special character (such as @, #, !, etc.)'
].join(', ')

abstract class BaseUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string

  @IsEmail()
  email?: string

  @Matches(emailAddressRegex, {
    message: emailAddressErrorMessage
  })
  password?: string
}

export class CreateUserDto extends BaseUserDto {}

export class UpdateUserDto extends BaseUserDto {
  @IsOptional()
  name?: string

  @IsOptional()
  email?: string

  @IsOptional()
  password?: string
}
