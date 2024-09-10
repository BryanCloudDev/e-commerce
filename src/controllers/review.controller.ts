import { Request, Response } from 'express'
import { BaseController } from './base-controller'
import { CreateReview } from '../interfaces'
import { ReviewService } from '../services'
import { HttpStatusCodes } from '../enums'
import { Logger } from '../config'
import { Review } from '../models'

export class ReviewController extends BaseController {
  constructor(
    private readonly reviewService: ReviewService = new ReviewService()
  ) {
    super()
  }

  private readonly logger = new Logger(ReviewController.name)

  createReview = async (req: Request, res: Response) => {
    this.logger.info('createReview')

    const createReview: CreateReview = req.body

    super.methodHandler(async () => {
      await this.reviewService.createReview(createReview)
      res.status(HttpStatusCodes.CREATED)
    }, res)
  }

  findById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('findById')

    const { id } = req.params

    super.methodHandler(async () => {
      const review = await this.reviewService.findById(+id)
      res.status(HttpStatusCodes.OK).json(this.response(review))
    }, res)
  }

  findByUserId = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('findByUserId')

    const { id } = req.params

    super.methodHandler(async () => {
      const reviews = await this.reviewService.findByUserId(+id)
      res.status(HttpStatusCodes.OK).json(this.response(reviews))
    }, res)
  }

  updateById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('updateById')

    const { id } = req.params
    const updateData: Partial<Review> = req.body

    super.methodHandler(async () => {
      await this.reviewService.updateById(+id, updateData)
      res.status(HttpStatusCodes.NO_CONTENT)
    }, res)
  }

  deleteById = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('deleteById')
    const id = req.params

    super.methodHandler(async () => {
      await this.reviewService.deleteById(+id)
      res.status(HttpStatusCodes.NO_CONTENT)
    }, res)
  }
}
