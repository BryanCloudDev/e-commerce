import { createUserRepository, UserRepository } from '../repositories'
import { exceptionHandler } from '../helpers/error-handler.handler'
import { NotFoundException } from '../helpers/errors.helper'
import { AppDataSource, Logger } from '../config'
import { CreateUser } from '../interfaces'
import { User } from '../models'

export class UserService {
  constructor(
    private readonly userRespository: UserRepository = createUserRepository(
      AppDataSource
    )
  ) {}
  private readonly logger = new Logger(UserService.name)

  async createUser(createUser: CreateUser): Promise<void> {
    this.logger.info('createUser')
    try {
      await this.userRespository.createUser(createUser)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: number): Promise<User> {
    this.logger.info('findUserById')
    try {
      const user = await this.userRespository.findById(id)

      if (!user) {
        throw new NotFoundException(`User with id ${id} was not found`)
      }
      return user
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.info('findUserByEmail')
    try {
      return await this.userRespository.findByEmail(email)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: number, updateData: Partial<CreateUser>): Promise<void> {
    this.logger.info('updateById')
    try {
      await this.findById(id)
      await this.userRespository.updateById(id, updateData)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: number): Promise<void> {
    this.logger.info('deleteById')
    try {
      await this.findById(id)
      await this.userRespository.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
