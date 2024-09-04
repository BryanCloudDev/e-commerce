import { createOrderRepository, OrderRepository } from '../repositories'
import { exceptionHandler } from '../helpers/error-handler.handler'
import { NotFoundException } from '../helpers/errors.helper'
import { AppDataSource, Logger } from '../config'
import { CreateOrder } from '../interfaces'
import { Order } from '../models'

export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository = createOrderRepository(
      AppDataSource
    )
  ) {}
  private readonly logger = new Logger(OrderService.name)

  async createOrder(createReview: CreateOrder): Promise<void> {
    this.logger.info('createOrder')
    try {
      await this.orderRepository.createOrder(createReview)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: number): Promise<Order> {
    this.logger.info('findById')
    try {
      const order = await this.orderRepository.findById(id)

      if (!order) {
        throw new NotFoundException(`Order with id ${id} was not found`)
      }

      return order
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findByUserId(id: number): Promise<Order[]> {
    this.logger.info('findByUserId')
    try {
      return await this.orderRepository.findByUserId(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: number, updateData: Partial<Order>): Promise<void> {
    this.logger.info('updateById')
    try {
      await this.findById(id)
      await this.orderRepository.updateById(id, updateData)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: number): Promise<void> {
    this.logger.info('deleteById')
    try {
      await this.findById(id)
      await this.orderRepository.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
