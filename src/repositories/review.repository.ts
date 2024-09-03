import {
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository
} from 'typeorm'
import { CreateReview } from '../interfaces'
import { Review } from '../models'

export class ReviewRepository extends Repository<Review> {
  constructor(
    target: EntityTarget<Review>,
    manager: EntityManager,
    queryRunner?: QueryRunner
  ) {
    super(target, manager, queryRunner)
  }

  /**
   * Finds reviews by user id.
   * @param id - The id of the user whose reviews are to be retrieved.
   * @returns A promise that resolves to an array of reviews associated with the given user id.
   */
  async findByUserId(id: number): Promise<Review[]> {
    try {
      return await this.find({ where: { user: { id } } })
    } catch (error) {
      throw new Error(`Error finding reviews by user id: ${error.message}`)
    }
  }

  /**
   * Finds a review by its id.
   * @param id - The id of the review to be retrieved.
   * @returns A promise that resolves to the found review, or `null` if not found.
   */
  async findById(id: number): Promise<Review | null> {
    try {
      return await this.findOne({ where: { id } })
    } catch (error) {
      throw new Error(`Error finding review by id: ${error.message}`)
    }
  }

  /**
   * Creates and saves a new review.
   * @param review - The id of the user who wrote the review.
   * @returns A promise that resolves to the created review.
   */
  async createReview(review: CreateReview): Promise<Review> {
    try {
      const reviewInstance = this.create(review)
      return await this.save(reviewInstance)
    } catch (error) {
      throw new Error(`Error creating review: ${error.message}`)
    }
  }

  /**
   * Updates a review’s details.
   * @param id - The id of the review.
   * @param updateData - A partial object containing the review fields to be updated.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async updateReviewById(
    id: number,
    updateData: Partial<Review>
  ): Promise<void> {
    try {
      await this.update(id, updateData)
    } catch (error) {
      throw new Error(`Error updating review by id: ${error.message}`)
    }
  }

  /**
   * Deletes a review by its id.
   * @param id - The id of the review.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async deleteReviewById(id: number): Promise<void> {
    try {
      await this.delete(id)
    } catch (error) {
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
