import { Router } from 'express'
import { OrderController } from '../controllers'
import { Routes } from '../enums'

export class OrderRouter {
  private readonly _route = `/${Routes.ORDER}`
  public readonly router = Router()

  constructor(private readonly orderController = new OrderController()) {
    this._initializeRoutes()
  }
  private _initializeRoutes(): void {
    this._createOrder()
    this._findById()
    this._findByUserId()
    this._updateById()
    this._deleteById()
  }

  private _createOrder(): void {
    this.router.post(`${this._route}`, this.orderController.createOrder)
  }

  private _findById(): void {
    this.router.get(`${this._route}/:id`, this.orderController.findById)
  }

  private _findByUserId(): void {
    this.router.get(
      `${this._route}/${Routes.USER}/:id`,
      this.orderController.findByUserId
    )
  }

  private _updateById(): void {
    this.router.patch(`${this._route}/:id`, this.orderController.updateById)
  }

  private _deleteById(): void {
    this.router.delete(`${this._route}/:id`, this.orderController.deleteById)
  }
}
