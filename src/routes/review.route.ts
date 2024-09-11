import { Router } from 'express'
import { ReviewController } from '../controllers'
import { Routes } from '../enums'

export class ReviewRouter {
  private readonly _route = `/${Routes.REVIEW}`
  public readonly router = Router()

  constructor(private readonly reviewController = new ReviewController()) {
    this._initializeRoutes()
  }
  private _initializeRoutes(): void {
    this._createReview()
    this._findById()
    this._findByUserId()
    this._updateById()
    this._deleteById()
  }

  private _createReview(): void {
    this.router.post(`${this._route}`, this.reviewController.createReview)
  }

  private _findById(): void {
    this.router.get(`${this._route}/:id`, this.reviewController.findById)
  }

  private _findByUserId(): void {
    this.router.get(
      `${this._route}/${Routes.USER}/:id`,
      this.reviewController.findByUserId
    )
  }

  private _updateById(): void {
    this.router.patch(`${this._route}/:id`, this.reviewController.updateById)
  }

  private _deleteById(): void {
    this.router.delete(`${this._route}/:id`, this.reviewController.deleteById)
  }
}
