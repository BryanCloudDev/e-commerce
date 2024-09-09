import { createReviewRepository, ReviewRepository } from '../repositories'
import { exceptionHandler } from '../helpers/error-handler.handler'
import { NotFoundException } from '../helpers/errors.helper'
import { AppDataSource, Logger } from '../config'
import { CreateReview } from '../interfaces'
import { Review } from '../models'

export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository = createReviewRepository(
      AppDataSource
    )
  ) {}
  private readonly logger = new Logger(ReviewService.name)

  async createReview(createReview: CreateReview): Promise<void> {
    this.logger.info('createReview')
    try {
      await this.reviewRepository.createReview(createReview)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: number): Promise<Review> {
    this.logger.info('findById')
    try {
      const review = await this.reviewRepository.findById(id)

      if (!review) {
        throw new NotFoundException(`Review with id ${id} was not found`)
      }

      return review
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findByUserId(id: number): Promise<Review[]> {
    this.logger.info('findByUserId')
    try {
      return await this.reviewRepository.findByUserId(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: number, updateData: Partial<Review>): Promise<void> {
    this.logger.info('updateById')
    try {
      await this.findById(id)
      await this.reviewRepository.updateById(id, updateData)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: number): Promise<void> {
    this.logger.info('deleteById')
    try {
      await this.findById(id)
      await this.reviewRepository.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
