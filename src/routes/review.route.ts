import { NextFunction, Router, Request, Response } from 'express'
import { checkIfIdIsInteger } from '../helpers/validation.helpers'
import { ReviewController } from '../controllers'
import { BaseRouter } from './base-route'
import { CreateReviewDto, UpdateReviewDto } from '../dto'
import { Routes } from '../enums'

export class ReviewRouter extends BaseRouter {
  private readonly _route = `/${Routes.REVIEW}`
  public readonly router = Router()

  constructor(private readonly reviewController = new ReviewController()) {
    super()
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
    this.router.post(
      `${this._route}/:id`,
      [checkIfIdIsInteger, this._validate.createReview],
      this.reviewController.createReview
    )
  }

  private _findById(): void {
    this.router.get(
      `${this._route}/:id`,
      [checkIfIdIsInteger],
      this.reviewController.findById
    )
  }

  private _findByUserId(): void {
    this.router.get(
      `${this._route}/${Routes.USER}/:id`,
      [checkIfIdIsInteger],
      this.reviewController.findByUserId
    )
  }

  private _updateById(): void {
    this.router.patch(
      `${this._route}/:id`,
      [checkIfIdIsInteger, this._validate.updateReview],
      this.reviewController.updateById
    )
  }

  private _deleteById(): void {
    this.router.delete(
      `${this._route}/:id`,
      [checkIfIdIsInteger],
      this.reviewController.deleteById
    )
  }

  private _validate = {
    createReview: async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { rating } = req.body
      const newReview = new CreateReviewDto()
      newReview.rating = rating

      await super.validateDto(newReview, res, next)
    },
    updateReview: async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { rating } = req.body
      const review = new UpdateReviewDto()
      review.rating = rating

      await super.validateDto(review, res, next)
    }
  }
}
