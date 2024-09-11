import { Request, Response } from 'express'
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto'
import { BaseController } from './base-controller'
import { HttpStatusCodes } from '../enums'
import { UserService } from '../services'
import { Logger } from '../config'

export class UserController extends BaseController {
  constructor(private readonly userService: UserService = new UserService()) {
    super()
  }

  private readonly logger = new Logger(UserController.name)

  // using properties instead of methods due to the binding of `this`
  // for `express` routes
  createUser = async (req: Request, res: Response) => {
    this.logger.info('createUser')

    const createUser: CreateUserDto = req.body

    await super.methodHandler(async () => {
      await this.userService.createUser(createUser)
      res.status(HttpStatusCodes.CREATED).send()
    }, res)
  }

  findById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('findById')

    const { id } = req.params

    await super.methodHandler(async () => {
      const user = await this.userService.findById(+id)
      res.status(HttpStatusCodes.OK).json(this.response(user))
    }, res)
  }

  findByEmail = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('findByEmail')

    const { email } = req.params

    await super.methodHandler(async () => {
      const user = await this.userService.findByEmail(email)
      res.status(HttpStatusCodes.OK).json(this.response(user))
    }, res)
  }

  updateById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('updateById')

    const { id } = req.params
    const updateData: UpdateUserDto = req.body

    await super.methodHandler(async () => {
      await this.userService.updateById(+id, updateData)
      res.status(HttpStatusCodes.NO_CONTENT).send()
    }, res)
  }

  deleteById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('deleteById')

    const { id } = req.params

    await super.methodHandler(async () => {
      await this.userService.deleteById(+id)
      res.status(HttpStatusCodes.NO_CONTENT).send()
    }, res)
  }
}
