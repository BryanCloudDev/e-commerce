import { Request, Response } from 'express'
import { dummyResponseOrder, dummyOrder, httpException } from '../mocks'
import { OrderController } from '../../../src/controllers'
import { HttpStatusCodes } from '../../../src/enums'
import { OrderService } from '../../../src/services'
import { Order } from '../../../src/models'

describe('OrderController', () => {
  let orderController: OrderController
  let orderService: jest.Mocked<OrderService>
  let req: Request
  let res: Response

  beforeEach(() => {
    orderService = {
      createOrder: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    } as unknown as jest.Mocked<OrderService>
    orderController = new OrderController(orderService)
    req = {
      body: {},
      params: {}
    } as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
  })

  describe('createOrder', () => {
    it('should create an order and return status code `201`', async () => {
      req.body = dummyOrder()
      await orderController.createOrder(req, res)

      expect(orderService.createOrder).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.CREATED)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.body = dummyOrder
      orderService.createOrder.mockRejectedValue(httpException)

      await orderController.createOrder(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('findById', () => {
    it('should find an order by id and return status code `200`', async () => {
      req.params.id = '1'
      const mockOrder: Order = dummyResponseOrder()
      orderService.findById.mockResolvedValue(mockOrder)

      await orderController.findById(req, res)

      expect(orderService.findById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith({ data: mockOrder })
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      orderService.findById.mockRejectedValue(httpException)

      await orderController.findById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('findByEmail', () => {
    it('should find an order by id and return status code `200`', async () => {
      req.params.id = '1'
      const mockOrder = [dummyResponseOrder()]
      orderService.findByUserId.mockResolvedValue(mockOrder)

      await orderController.findByUserId(req, res)

      expect(orderService.findByUserId).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith({ data: mockOrder })
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      orderService.findByUserId.mockRejectedValue(httpException)

      await orderController.findByUserId(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('updateById', () => {
    it('should update an order by id and return status code `204`', async () => {
      req.params.id = '1'
      req.body = { itemCount: 6 }
      await orderController.updateById(req, res)

      expect(orderService.updateById).toHaveBeenCalledWith(1, req.body)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.NO_CONTENT)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      req.body = { itemCount: 6 }
      orderService.updateById.mockRejectedValue(httpException)

      await orderController.updateById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('deleteById', () => {
    it('should delete an order by id and return status code `204`', async () => {
      req.params.id = '1'
      await orderController.deleteById(req, res)

      expect(orderService.deleteById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.NO_CONTENT)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      orderService.deleteById.mockRejectedValue(httpException)

      await orderController.deleteById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })
})
