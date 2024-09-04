import { AppTestDataSource } from './data-source'
import { dummyOrder, errorMessage } from './mocks'
import { Order } from '../../../src/models'
import {
  createOrderRepository,
  createUserRepository,
  OrderRepository,
  UserRepository
} from '../../../src/repositories'
import { OrderStatus } from '../../../src/enums'

describe('OrderRepository', () => {
  let orderRepository: OrderRepository
  let userRepository: UserRepository
  const { user, ...order } = dummyOrder()

  beforeEach(async () => {
    await AppTestDataSource.initialize()
    orderRepository = createOrderRepository(AppTestDataSource)
    userRepository = createUserRepository(AppTestDataSource)
  })

  afterEach(async () => {
    await AppTestDataSource.destroy()
  })

  describe('findByUserId', () => {
    it('should find `orders` by user `id`', async () => {
      // creating user
      const createdUser = await userRepository.createUser(user)

      // creating 2 orders
      await orderRepository.createOrder({
        user: createdUser,
        ...order
      })

      await orderRepository.createOrder({
        user: createdUser,
        ...order
      })

      const actual = await orderRepository.findByUserId(1)

      expect(actual).not.toBe(null)
      expect(Array.isArray(actual)).toBe(true)
      expect(actual.length).toBe(2)
    })

    it('should return an empty array when no `orders` are found by the provided `id`', async () => {
      const actual = await orderRepository.findByUserId(1)

      expect(actual.length).toBe(0)
      expect(Array.isArray(actual)).toBe(true)
    })

    it('should handle errors when finding `orders` by `id`', async () => {
      // Mock of `find` to throw an error
      jest.spyOn(orderRepository, 'find').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await orderRepository.findByUserId(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error finding orders by user id: ${errorMessage}`
        )
      }
    })
  })

  describe('findById', () => {
    it('should find an `order` by `id`', async () => {
      // creating user
      const createdUser = await userRepository.createUser(user)

      // creating order
      await orderRepository.createOrder({
        user: createdUser,
        ...order
      })

      const actual = await orderRepository.findById(1)

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(Order)
    })

    it('should return `null` when no `review` is found by `id`', async () => {
      const actual = await orderRepository.findById(1)

      expect(actual).toBe(null)
    })

    it('should handle errors when finding a `review` by `id`', async () => {
      // Mock of `findOne` to throw an error
      jest.spyOn(orderRepository, 'findOne').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await orderRepository.findById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error finding order by id: ${errorMessage}`)
      }
    })
  })

  describe('createOrder', () => {
    it('should create a new `review`', async () => {
      // creating user
      const createdUser = await userRepository.createUser(user)

      // creating order
      const actual = await orderRepository.createOrder({
        user: createdUser,
        ...order
      })

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(Order)
    })

    it('should handle errors when creating an `order`', async () => {
      // Mock of `save` to throw an error
      jest.spyOn(orderRepository, 'save').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        // creating user
        const createdUser = await userRepository.createUser(user)

        // creating order
        await orderRepository.createOrder({
          user: createdUser,
          ...order
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error creating order: ${errorMessage}`)
      }
    })
  })

  describe('updateOrder', () => {
    it('should update an `order`', async () => {
      // creating user
      const createdUser = await userRepository.createUser(user)

      // creating order
      await orderRepository.createOrder({
        user: createdUser,
        ...order
      })

      const actual = await orderRepository.updateById(1, {
        status: OrderStatus.Cancelled
      })

      expect(actual).toBe(undefined)
    })

    it('should handle errors when updating an `order`', async () => {
      // Mock of `update` to throw an error
      jest.spyOn(orderRepository, 'update').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await orderRepository.updateById(1, {
          status: OrderStatus.Cancelled
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error updating order by id: ${errorMessage}`
        )
      }
    })
  })

  describe('deleteReview', () => {
    it('should delete a `review`', async () => {
      // creating user
      const createdUser = await userRepository.createUser(user)

      // creating order
      await orderRepository.createOrder({
        user: createdUser,
        ...order
      })

      const actual = await orderRepository.deleteById(1)

      expect(actual).toBe(undefined)
    })

    it('should handle errors when deleting a `review`', async () => {
      // Mock of `delete` to throw an error
      jest.spyOn(orderRepository, 'delete').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await orderRepository.deleteById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error deleting order by id: ${errorMessage}`
        )
      }
    })
  })
})
