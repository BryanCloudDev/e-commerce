import { Request, Response } from 'express'
import { BaseController } from './base-controller'
import { CreateOrder } from '../interfaces'
import { HttpStatusCodes } from '../enums'
import { OrderService } from '../services'
import { Logger } from '../config'
import { Order } from '../models'

export class OrderController extends BaseController {
  constructor(
    private readonly orderService: OrderService = new OrderService()
  ) {
    super()
  }

  private readonly logger = new Logger(OrderController.name)

  createOrder = async (req: Request, res: Response) => {
    this.logger.info('createOrder')

    const createOrder: CreateOrder = req.body

    await super.methodHandler(async () => {
      await this.orderService.createOrder(createOrder)
      res.status(HttpStatusCodes.CREATED)
    }, res)
  }

  findById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('findById')

    const { id } = req.params

    await super.methodHandler(async () => {
      const order = await this.orderService.findById(+id)
      res.status(HttpStatusCodes.OK).json(this.response(order))
    }, res)
  }

  findByUserId = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('findByUserId')

    const { id } = req.params

    await super.methodHandler(async () => {
      const orders = await this.orderService.findByUserId(+id)
      res.status(HttpStatusCodes.OK).json(this.response(orders))
    }, res)
  }

  updateById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('updateById')

    const { id } = req.params
    const updateData: Partial<Order> = req.body

    await super.methodHandler(async () => {
      await this.orderService.updateById(+id, updateData)
      res.status(HttpStatusCodes.NO_CONTENT)
    }, res)
  }

  deleteById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('deleteById')
    const { id } = req.params

    await super.methodHandler(async () => {
      await this.orderService.deleteById(+id)
      res.status(HttpStatusCodes.NO_CONTENT)
    }, res)
  }
}
