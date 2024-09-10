import { Request, Response } from 'express'
import { dummyResponseUser, dummyUser, httpException } from '../mocks'
import { UserController } from '../../../src/controllers'
import { HttpStatusCodes } from '../../../src/enums'
import { UserService } from '../../../src/services'
import { User } from '../../../src/models'

describe('UserController', () => {
  let userController: UserController
  let userService: jest.Mocked<UserService>
  let req: Request
  let res: Response

  beforeEach(() => {
    userService = {
      createUser: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    } as unknown as jest.Mocked<UserService>
    userController = new UserController(userService)
    req = {
      body: {},
      params: {}
    } as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
  })

  describe('createUser', () => {
    it('should create a user and return status code `201`', async () => {
      req.body = dummyUser
      await userController.createUser(req, res)

      expect(userService.createUser).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.CREATED)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.body = dummyUser
      userService.createUser.mockRejectedValue(httpException)

      await userController.createUser(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('findById', () => {
    it('should find a user by id and return status code `200`', async () => {
      req.params.id = '1'
      const mockUser: User = dummyResponseUser()
      userService.findById.mockResolvedValue(mockUser)

      await userController.findById(req, res)

      expect(userService.findById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith(userController.response(mockUser))
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      userService.findById.mockRejectedValue(httpException)

      await userController.findById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('findByEmail', () => {
    it('should find a user by id and return status code `200`', async () => {
      req.params.email = 'test@example.com'
      const mockUser = dummyResponseUser()
      userService.findByEmail.mockResolvedValue(mockUser)

      await userController.findByEmail(req, res)

      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com')
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith(userController.response(mockUser))
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.email = 'test@example.com'
      userService.findByEmail.mockRejectedValue(httpException)

      await userController.findByEmail(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('updateById', () => {
    it('should update a user by id and return status code `204`', async () => {
      req.params.id = '1'
      req.body = { name: 'Doe John' }
      await userController.updateById(req, res)

      expect(userService.updateById).toHaveBeenCalledWith(1, req.body)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.NO_CONTENT)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      req.body = { name: 'Doe John' }
      userService.updateById.mockRejectedValue(httpException)

      await userController.updateById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })

  describe('deleteById', () => {
    it('should delete a user by id and return status code `204`', async () => {
      req.params.id = '1'
      await userController.deleteById(req, res)

      expect(userService.deleteById).toHaveBeenCalledWith(1)
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.NO_CONTENT)
    })

    it('should handle exceptions and return status code `500`', async () => {
      req.params.id = '1'
      userService.deleteById.mockRejectedValue(httpException)

      await userController.deleteById(req, res)

      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    })
  })
})
