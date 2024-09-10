import { Request, Response } from 'express'
import { dummyResponseReview, dummyReview, httpException } from '../mocks'
import { ReviewController } from '../../../src/controllers'
import { ReviewService } from '../../../src/services'
import { HttpStatusCodes } from '../../../src/enums'
import { Review } from '../../../src/models'

describe('ReviewController', () => {
  let reviewController: ReviewController
  let reviewService: jest.Mocked<ReviewService>
  let req: Request
  let res: Response

  beforeEach(() => {
    reviewService = {
      createReview: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    } as unknown as jest.Mocked<ReviewService>
    reviewController = new ReviewController(reviewService)
    req = {
      body: {},
      params: {}
    } as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
  })

  describe('createReview', () => {
    it('should create a review and return status code `201`', async () => {
      req.body = dummyReview()
      await reviewController.createReview(req, res)

      expect(reviewService.createReview).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.CREATED)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.body = dummyReview()
      reviewService.createReview.mockRejectedValue(httpException)

      await reviewController.createReview(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('findById', () => {
    it('should find a review by id and return status code `200`', async () => {
      req.params.id = '1'
      const mockReview: Review = dummyResponseReview()
      reviewService.findById.mockResolvedValue(mockReview)

      await reviewController.findById(req, res)

      expect(reviewService.findById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith({ data: mockReview })
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      reviewService.findById.mockRejectedValue(httpException)

      await reviewController.findById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('findByUserId', () => {
    it('should find reviews by id and return status code `200`', async () => {
      req.params.id = '1'
      const mockReview = [dummyResponseReview()]
      reviewService.findByUserId.mockResolvedValue(mockReview)

      await reviewController.findByUserId(req, res)

      expect(reviewService.findByUserId).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith({ data: mockReview })
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      reviewService.findByUserId.mockRejectedValue(httpException)

      await reviewController.findByUserId(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('updateById', () => {
    it('should update a review by id and return status code `204`', async () => {
      req.params.id = '1'
      req.body = { rating: 3 }
      await reviewController.updateById(req, res)

      expect(reviewService.updateById).toHaveBeenCalledWith(1, req.body)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.NO_CONTENT)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      req.body = { name: 'Doe John' }
      reviewService.updateById.mockRejectedValue(httpException)

      await reviewController.updateById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('deleteById', () => {
    it('should delete a review by id and return status code `204`', async () => {
      req.params.id = '1'
      await reviewController.deleteById(req, res)

      expect(reviewService.deleteById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.NO_CONTENT)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      reviewService.deleteById.mockRejectedValue(httpException)

      await reviewController.deleteById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })
})
