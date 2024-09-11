import { BadRequestException, NotFoundException } from '../../../src/helpers'
import { UserRepository } from '../../../src/repositories'
import { CreateUserDto, UpdateUserDto } from '../../../src/dto/user.dto'
import { dummyUser, dummyResponseUser } from '../mocks'
import { UserService } from '../../../src/services'
import { User } from '../../../src/models'

describe('UserService', () => {
  let user: CreateUserDto
  let userRepository: jest.Mocked<UserRepository>
  let userService: UserService
  let responseUser: User

  beforeEach(() => {
    user = dummyUser
    userRepository = {
      createUser: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn()
    } as unknown as jest.Mocked<UserRepository>
    userService = new UserService(userRepository)
    responseUser = dummyResponseUser()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      userRepository.createUser.mockResolvedValue(Promise.resolve(undefined))

      const actual = await userService.createUser(user)

      expect(userRepository.createUser).toHaveBeenCalledWith(user)
      expect(actual).toBe(undefined)
    })

    it('should throw an error if the email is already registered', async () => {
      try {
        await userService.createUser(user)
        await userService.createUser(user)
      } catch (error) {
        expect(error.message).toBe(
          `Email address ${user.email} is already in use`
        )
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })
  })

  describe('findById', () => {
    it('should return a user when it is found', async () => {
      userRepository.findById.mockResolvedValue(Promise.resolve(responseUser))

      const result = await userService.findById(1)

      expect(result).toEqual(responseUser)
      expect(result).toBeInstanceOf(User)
    })

    it('should throw `NotFoundException` if the user is not found', async () => {
      userRepository.findById.mockResolvedValue(null)

      try {
        await userService.findById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findByEmail', () => {
    const userEmail = 'test@example.com'

    it('should return a user when it is found by email', async () => {
      userRepository.findByEmail.mockResolvedValue(
        Promise.resolve(responseUser)
      )

      const result = await userService.findByEmail(userEmail)

      expect(result).toEqual(responseUser)
      expect(result).toBeInstanceOf(User)
    })

    it('should throw `NotFoundException` if the user is not found by email', async () => {
      userRepository.findByEmail.mockResolvedValue(null)

      try {
        await userService.findByEmail(userEmail)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('updateById', () => {
    it('should update a user', async () => {
      const id = 1
      const updateData: UpdateUserDto = {
        email: 'newemail@example.com'
      }

      userRepository.findById.mockResolvedValue(Promise.resolve(responseUser))
      userRepository.updateById.mockResolvedValue(Promise.resolve())

      const actual = await userService.updateById(id, updateData)

      expect(actual).toBe(undefined)
      expect(userRepository.findById).toHaveBeenCalledWith(id)
      expect(userRepository.updateById).toHaveBeenCalledWith(id, updateData)
    })
  })

  describe('deleteById', () => {
    it('should delete a user', async () => {
      const id = 1

      userRepository.findById.mockResolvedValue(Promise.resolve(responseUser))
      userRepository.deleteById.mockResolvedValue(Promise.resolve())

      const actual = await userService.deleteById(id)

      expect(actual).toBe(undefined)
      expect(userRepository.findById).toHaveBeenCalledWith(id)
      expect(userRepository.deleteById).toHaveBeenCalledWith(id)
    })
  })
})
