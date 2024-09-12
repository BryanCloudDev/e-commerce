import {
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository
} from 'typeorm'
import { CreateReviewDto, UpdateReviewDto } from '../dto'
import { Logger } from '../config/logger'
import { Review, User } from '../models'

export class ReviewRepository extends Repository<Review> {
  constructor(
    target: EntityTarget<Review>,
    manager: EntityManager,
    queryRunner?: QueryRunner
  ) {
    super(target, manager, queryRunner)
  }

  private readonly logger = new Logger(ReviewRepository.name)

  /**
   * Finds reviews by user id.
   * @param id - The id of the user whose reviews are to be retrieved.
   * @returns A promise that resolves to an array of reviews associated with the given user id.
   */
  async findByUserId(id: number): Promise<Review[]> {
    this.logger.info('findByUserId')
    try {
      return await this.find({ where: { user: { id } } })
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error finding reviews by user id: ${error.message}`)
    }
  }

  /**
   * Finds a review by its id.
   * @param id - The id of the review to be retrieved.
   * @returns A promise that resolves to the found review, or `null` if not found.
   */
  async findById(id: number): Promise<Review | null> {
    this.logger.info('findById')
    try {
      return await this.findOne({ where: { id } })
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error finding review by id: ${error.message}`)
    }
  }

  /**
   * Creates and saves a new review.
   * @param review - The id of the user who wrote the review.
   * @returns A promise that resolves to the created review.
   */
  async createReview(review: CreateReviewDto, user: User): Promise<Review> {
    this.logger.info('createReview')
    try {
      const reviewInstance = this.create(review)
      reviewInstance.user = user

      return await this.save(reviewInstance)
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error creating review: ${error.message}`)
    }
  }

  /**
   * Updates a review’s details.
   * @param id - The id of the review.
   * @param updateData - A partial object containing the review fields to be updated.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async updateById(id: number, updateData: UpdateReviewDto): Promise<void> {
    this.logger.info('updateById')
    try {
      await this.update(id, updateData)
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error updating review by id: ${error.message}`)
    }
  }

  /**
   * Deletes a review by its id.
   * @param id - The id of the review.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async deleteById(id: number): Promise<void> {
    this.logger.info('deleteById')
    try {
      await this.delete(id)
    } catch (error) {
      this.logger.error(error.message)
      throw new Error(`Error deleting review by id: ${error.message}`)
    }
  }
}

/**
 * Creates repository of type `ReviewRepository`.
 * @param dataSource - The data source to be used.
 * @returns A `ReviewRepository`.
 */
export const createReviewRepository = (
  dataSource: DataSource
): ReviewRepository => {
  const baseRepository = dataSource.getRepository(Review)

  return new ReviewRepository(
    baseRepository.target,
    baseRepository.manager,
    baseRepository.queryRunner
  )
}
