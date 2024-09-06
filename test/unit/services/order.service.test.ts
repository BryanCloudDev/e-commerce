import { OrderRepository } from '../../../src/repositories'
import { dummyOrder, dummyResponseOrder } from '../mocks'
import { NotFoundException } from '../../../src/helpers'
import { CreateOrder } from '../../../src/interfaces'
import { OrderService } from '../../../src/services'
import { OrderStatus } from '../../../src/enums'
import { Order } from '../../../src/models'

describe('OrderService', () => {
  let order: CreateOrder
  let orderRepository: jest.Mocked<OrderRepository>
  let orderService: OrderService
  let responseOrder: Order

  beforeEach(() => {
    order = dummyOrder()
    orderRepository = {
      createOrder: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    } as unknown as jest.Mocked<OrderRepository>
    orderService = new OrderService(orderRepository)
    responseOrder = dummyResponseOrder()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createOrder', () => {
    it('should create an order', async () => {
      orderRepository.createOrder.mockResolvedValue(
        Promise.resolve(responseOrder)
      ) // Simulating answer from method

      const actual = await orderService.createOrder(order)

      expect(orderRepository.createOrder).toHaveBeenCalledWith(order)
      expect(actual).toBe(undefined)
    })
  })

  describe('findById', () => {
    it('should return an order when it is found', async () => {
      orderRepository.findById.mockResolvedValue(Promise.resolve(responseOrder))

      const result = await orderService.findById(1)

      expect(result).toEqual(responseOrder)
      expect(result).toBeInstanceOf(Order)
    })

    it('should throw `NotFoundException` if the order is not found', async () => {
      orderRepository.findById.mockResolvedValue(null)

      try {
        await orderService.findById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('updateById', () => {
    it('should update an order', async () => {
      const id = 1
      const updateData: Partial<Order> = {
        status: OrderStatus.Cancelled
      }

      orderRepository.findById.mockResolvedValue(Promise.resolve(responseOrder))
      orderRepository.updateById.mockResolvedValue(Promise.resolve(undefined))

      const actual = await orderService.updateById(id, updateData)

      expect(actual).toBe(undefined)
      expect(orderRepository.findById).toHaveBeenCalledWith(id)
      expect(orderRepository.updateById).toHaveBeenCalledWith(id, updateData)
    })
  })

  describe('deleteById', () => {
    it('should delete an order', async () => {
      const id = 1

      orderRepository.findById.mockResolvedValue(responseOrder)
      orderRepository.deleteById.mockResolvedValue(undefined)

      const actual = await orderService.deleteById(id)

      expect(actual).toBe(undefined)
      expect(orderRepository.findById).toHaveBeenCalledWith(id)
      expect(orderRepository.deleteById).toHaveBeenCalledWith(id)
    })
  })
})
