import { createUserRepository, UserRepository } from '../../../src/repositories'
import { AppTestDataSource } from './data-source'
import { dummyUser, errorMessage } from './mocks'
import { User } from '../../../src/models'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(async () => {
    await AppTestDataSource.initialize()
    userRepository = createUserRepository(AppTestDataSource)
  })

  afterEach(async () => {
    await AppTestDataSource.destroy()
  })

  describe('findByEmail', () => {
    it('should find a user by `email`', async () => {
      await userRepository.save(dummyUser)

      const actual = await userRepository.findByEmail('test-email@email.com')

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(User)
    })

    it('should return `undefined` when no user is found by the provided `email`', async () => {
      const actual = await userRepository.findByEmail('test-email@email.com')

      expect(actual).toBe(null)
    })

    it('should handle errors when finding a user by `email`', async () => {
      // Mock of `findOne` to throw an error
      jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await userRepository.findByEmail('test-email@email.com')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          `Error finding user by email: ${errorMessage}`
        )
      }
    })
  })

  describe('findById', () => {
    it('should find a user by `id`', async () => {
      await userRepository.save(dummyUser)

      const actual = await userRepository.findById(1)

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(User)
    })

    it('should return `undefined` when no user is found by the provided `id`', async () => {
      const actual = await userRepository.findById(2)

      expect(actual).toBe(null)
    })

    it('should handle errors when finding a user by `id`', async () => {
      // Mock of `findOne` to throw an error
      jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await userRepository.findById(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error finding user by id: ${errorMessage}`)
      }
    })
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      const actual = await userRepository.createUser(dummyUser)

      expect(actual).not.toBe(null)
      expect(actual).toBeInstanceOf(User)
    })

    it('should return throw an exception when the `email` is duplicated', async () => {
      try {
        await userRepository.createUser(dummyUser)
        await userRepository.createUser(dummyUser)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(
          'Error creating user: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email'
        )
      }
    })

    it('should handle errors when creating a user', async () => {
      // Mock of `createUser` to throw an error
      jest.spyOn(userRepository, 'save').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await userRepository.createUser(dummyUser)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error creating user: ${errorMessage}`)
      }
    })
  })

  describe('updateUserById', () => {
    it('should update a user', async () => {
      await userRepository.createUser(dummyUser)

      const actual = await userRepository.updateUserById(1, {
        name: 'New Name',
        email: 'new-email@email.com',
        password: '87654321'
      })

      expect(actual).toBe(undefined)
    })

    it('should handle errors when updating a user', async () => {
      // Mock of `update` to throw an error
      jest.spyOn(userRepository, 'update').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await userRepository.updateUserById(1, {
          name: 'New Name',
          email: 'new-email@email.com',
          password: '87654321'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error updating user by id: ${errorMessage}`)
      }
    })
  })

  describe('updateUserById', () => {
    it('should delete a user', async () => {
      await userRepository.createUser(dummyUser)

      const actual = await userRepository.deleteUser(1)

      expect(actual).toBe(undefined)
    })

    it('should handle errors when deleting a user', async () => {
      // Mock of `delete` to throw an error
      jest.spyOn(userRepository, 'delete').mockImplementation(() => {
        throw new Error(errorMessage)
      })

      try {
        await userRepository.updateUserById(1, {
          name: 'New Name',
          email: 'new-email@email.com',
          password: '87654321'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe(`Error deleting user by id: ${errorMessage}`)
      }
    })
  })
})
