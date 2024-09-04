import {
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository
} from 'typeorm'
import { CreateOrder } from '../interfaces'
import { Logger } from '../config/logger'
import { Order } from '../models'

export class OrderRepository extends Repository<Order> {
  constructor(
    target: EntityTarget<Order>,
    manager: EntityManager,
    queryRunner?: QueryRunner
  ) {
    super(target, manager, queryRunner)
  }

  private readonly logger = new Logger(OrderRepository.name)

  /**
   * Finds orders by the user id.
   * @param id - The id of the user whose orders are to be retrieved.
   * @returns A promise that resolves to an array of orders associated with the given user id.
   */
  async findByUserId(id: number): Promise<Order[]> {
    this.logger.info('findByUserId')
    try {
      return await this.find({ where: { user: { id } } })
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error finding orders by user id: ${error.message}`)
    }
  }

  /**
   * Finds an order by its id.
   * @param id - The id of the order to be retrieved.
   * @returns A promise that resolves to the found order, or `null` if not found.
   */
  async findById(id: number): Promise<Order | null> {
    this.logger.info('findById')
    try {
      return await this.findOne({ where: { id } })
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error finding order by id: ${error.message}`)
    }
  }

  /**
   * Creates and saves a new order.
   * @param createOrder - The order data to be created.
   * @returns A promise that resolves to the created order.
   */
  async createOrder(createOrder: CreateOrder): Promise<Order> {
    this.logger.info('createOrder')
    try {
      const orderInstance = this.create(createOrder)
      return await this.save(orderInstance)
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error creating order: ${error.message}`)
    }
  }

  /**
   * Updates an order’s details.
   * @param id - The id of the order.
   * @param updateData - The partial order data to be updated.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async updateById(id: number, updateData: Partial<Order>): Promise<void> {
    this.logger.info('updateById')
    try {
      await this.update(id, updateData)
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error updating order by id: ${error.message}`)
    }
  }

  /**
   * Deletes an order by its id.
   * @param id - The id of the order.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async deleteById(id: number): Promise<void> {
    this.logger.info('deleteById')
    try {
      await this.delete(id)
    } catch (error) {
      this.logger.info(error.message)
      throw new Error(`Error deleting order by id: ${error.message}`)
    }
  }
}

/**
 * Creates repository of type `OrderRepository`.
 * @param dataSource - The data source to be used.
 * @returns A `OrderRepository`.
 */
export const createOrderRepository = (
  dataSource: DataSource
): OrderRepository => {
  const baseRepository = dataSource.getRepository(Order)

  return new OrderRepository(
    baseRepository.target,
    baseRepository.manager,
    baseRepository.queryRunner
  )
}
