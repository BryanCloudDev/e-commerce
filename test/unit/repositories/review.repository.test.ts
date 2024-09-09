import {
  createReviewRepository,
  createUserRepository,
  ReviewRepository,
  UserRepository
} from '../../../src/repositories'
import { dummyReview, errorMessage } from '../mocks'
import { AppTestDataSource } from './data-source'
import { Review } from '../../../src/models'

describe('ReviewRepository', () => {
  let reviewRepository: ReviewRepository
  let userRepository: UserRepository
  const { user, rating } = dummyReview()

  beforeEach(async () => {
    await AppTestDataSource.initialize()
    reviewRepository = createReviewRepository(AppTestDataSource)
    userRepository = createUserRepository(AppTestDataSource)
  })

  afterEach(async () => {
    await AppTestDataSource.destroy()
  })

  describe('findByUserId', () => {
    it('should find `reviews` by user `id`', async () => {
      // we create a temporal user
      const createdUser = await userRepository.createUser(user)

      // creating 2 reviews
      await reviewRepository.createReview({
        rating,
        user: createdUser
      })

      await reviewRepository.createReview({
        rating,
        user: createdUser
      })

      const actual = await reviewRepository.findByUserId(1)

      expect(actual).not.toBe(null)
      expect(Array.isArray(actual)).toBe(true)
      expect(actual.length).toBe(2)
    })

    it('should return an empty array when no `reviews` are found by the provided `id`', async () => {
      const actual = await reviewRepository.findByUserId(1)

      expect(actual.length).toBe(0)
      expect(Array.isArray(actual)).toBe(true)
    })

    it('should handle errors when finding `reviews` by `id`', async () => {
      // Mock of `find` to throw an error
      jest.spyOn(reviewRepository, 'find').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await reviewRepository.findByUserId(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error finding reviews by user id: ${errorMessage}`
        )
      }
    })
  })

  describe('findById', () => {
    it('should find a `review` by `id`', async () => {
      // creating a user
      const createdUser = await userRepository.createUser(user)

      // creating a review
      await reviewRepository.createReview({
        rating,
        user: createdUser
      })

      const actual = await reviewRepository.findById(1)

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(Review)
    })

    it('should return `null` when no `review` is found by `id`', async () => {
      const actual = await reviewRepository.findById(1)

      expect(actual).toBe(null)
    })

    it('should handle errors when finding a `review` by `id`', async () => {
      // Mock of `findOne` to throw an error
      jest.spyOn(reviewRepository, 'findOne').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await reviewRepository.findById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error finding review by id: ${errorMessage}`
        )
      }
    })
  })

  describe('createReview', () => {
    it('should create a new `review`', async () => {
      // creating a user
      const createdUser = await userRepository.createUser(user)

      // creating a review
      const actual = await reviewRepository.createReview({
        rating,
        user: createdUser
      })

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(Review)
    })

    it('should handle errors when creating a `review`', async () => {
      // Mock of `createUser` to throw an error
      jest.spyOn(reviewRepository, 'save').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        // creating a user
        const createdUser = await userRepository.createUser(user)

        await reviewRepository.createReview({
          rating,
          user: createdUser
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error creating review: ${errorMessage}`)
      }
    })
  })

  describe('updateReview', () => {
    it('should update a `review`', async () => {
      // creating a user
      const createdUser = await userRepository.createUser(user)

      // creating a review
      await reviewRepository.createReview({
        rating,
        user: createdUser
      })

      const actual = await reviewRepository.updateById(1, {
        rating,
        user: createdUser
      })

      expect(actual).toBe(undefined)
    })

    it('should handle errors when updating a user', async () => {
      // Mock of `update` to throw an error
      jest.spyOn(reviewRepository, 'update').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        // creating a user
        const createdUser = await userRepository.createUser(user)

        await reviewRepository.updateById(1, {
          rating,
          user: createdUser
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error updating review by id: ${errorMessage}`
        )
      }
    })
  })

  describe('deleteReview', () => {
    it('should delete a `review`', async () => {
      // creating a user
      const createdUser = await userRepository.createUser(user)

      // creating a review
      await reviewRepository.createReview({
        rating,
        user: createdUser
      })

      const actual = await reviewRepository.deleteById(1)

      expect(actual).toBe(undefined)
    })

    it('should handle errors when deleting a `review`', async () => {
      // Mock of `delete` to throw an error
      jest.spyOn(reviewRepository, 'delete').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await reviewRepository.deleteById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error deleting review by id: ${errorMessage}`
        )
      }
    })
  })
})
