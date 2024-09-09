import { ReviewRepository } from '../../../src/repositories'
import { dummyReview, dummyResponseReview } from '../mocks'
import { NotFoundException } from '../../../src/helpers'
import { CreateReview } from '../../../src/interfaces'
import { ReviewService } from '../../../src/services'
import { Review } from '../../../src/models'

describe('ReviewService', () => {
  let review: CreateReview
  let reviewRepository: jest.Mocked<ReviewRepository>
  let reviewService: ReviewService
  let responseReview: Review

  beforeEach(() => {
    review = dummyReview()
    reviewRepository = {
      createReview: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    } as unknown as jest.Mocked<ReviewRepository>
    reviewService = new ReviewService(reviewRepository)
    responseReview = dummyResponseReview()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createReview', () => {
    it('should create a review', async () => {
      reviewRepository.createReview.mockResolvedValue(
        Promise.resolve(undefined)
      )

      const actual = await reviewService.createReview(review)

      expect(reviewRepository.createReview).toHaveBeenCalledWith(review)
      expect(actual).toBe(undefined)
    })
  })

  describe('findById', () => {
    it('should return a review when it is found', async () => {
      reviewRepository.findById.mockResolvedValue(
        Promise.resolve(responseReview)
      )

      const result = await reviewService.findById(1)

      expect(result).toEqual(responseReview)
      expect(result).toBeInstanceOf(Review)
    })

    it('should throw `NotFoundException` if the review is not found', async () => {
      reviewRepository.findById.mockResolvedValue(null)

      try {
        await reviewService.findById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findByUserId', () => {
    it('should return reviews by user id', async () => {
      const response: Review[] = [responseReview]
      reviewRepository.findByUserId.mockResolvedValue(Promise.resolve(response))

      const result = await reviewService.findByUserId(1)

      expect(result).toEqual(response)
      expect(result).toBeInstanceOf(Array)
      expect(result[0]).toBeInstanceOf(Review)
    })
  })

  describe('updateById', () => {
    it('should update a review', async () => {
      reviewRepository.findById.mockResolvedValue(
        Promise.resolve(responseReview)
      )
      reviewRepository.updateById.mockResolvedValue(Promise.resolve())
      const id = 1
      const updateData: Partial<Review> = {
        rating: 6
      }

      const actual = await reviewService.updateById(id, updateData)

      expect(actual).toBe(undefined)
      expect(reviewRepository.findById).toHaveBeenCalledWith(id)
      expect(reviewRepository.updateById).toHaveBeenCalledWith(id, updateData)
    })
  })

  describe('deleteById', () => {
    it('should delete a review', async () => {
      const id = 1

      reviewRepository.findById.mockResolvedValue(
        Promise.resolve(responseReview)
      )
      reviewRepository.deleteById.mockResolvedValue(Promise.resolve())

      const actual = await reviewService.deleteById(id)

      expect(actual).toBe(undefined)
      expect(reviewRepository.findById).toHaveBeenCalledWith(id)
      expect(reviewRepository.deleteById).toHaveBeenCalledWith(id)
    })
  })
})
