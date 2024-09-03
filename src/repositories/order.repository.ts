import {
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository
} from 'typeorm'
import { CreateOrder } from '../interfaces'
import { Order } from '../models'

export class OrderRepository extends Repository<Order> {
  constructor(
    target: EntityTarget<Order>,
    manager: EntityManager,
    queryRunner?: QueryRunner
  ) {
    super(target, manager, queryRunner)
  }

  /**
   * Finds orders by the user id.
   * @param id - The id of the user whose orders are to be retrieved.
   * @returns A promise that resolves to an array of orders associated with the given user id.
   */
  async findByUserId(id: number): Promise<Order[]> {
    try {
      return await this.find({ where: { user: { id } } })
    } catch (error) {
      throw new Error(`Error finding orders by user id: ${error.message}`)
    }
  }

  /**
   * Finds an order by its id.
   * @param id - The id of the order to be retrieved.
   * @returns A promise that resolves to the found order, or `null` if not found.
   */
  async findById(id: number): Promise<Order | null> {
    try {
      return await this.findOne({ where: { id } })
    } catch (error) {
      throw new Error(`Error finding order by id: ${error.message}`)
    }
  }

  /**
   * Creates and saves a new order.
   * @param createOrder - The order data to be created.
   * @returns A promise that resolves to the created order.
   */
  async createOrder(createOrder: CreateOrder): Promise<Order> {
    try {
      const orderInstance = this.create(createOrder)
      return await this.save(orderInstance)
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`)
    }
  }

  /**
   * Updates an order’s details.
   * @param id - The id of the order.
   * @param updateData - The partial order data to be updated.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async updateOrderById(id: number, updateData: Partial<Order>): Promise<void> {
    try {
      await this.update(id, updateData)
    } catch (error) {
      throw new Error(`Error updating order by id: ${error.message}`)
    }
  }

  /**
   * Deletes an order by its id.
   * @param id - The id of the order.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async deleteOrderById(id: number): Promise<void> {
    try {
      await this.delete(id)
    } catch (error) {
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
