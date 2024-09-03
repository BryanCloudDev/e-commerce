import {
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository
} from 'typeorm'
import { CreateUser } from '../interfaces'
import { User } from '../models'

export class UserRepository extends Repository<User> {
  constructor(
    target: EntityTarget<User>,
    manager: EntityManager,
    queryRunner?: QueryRunner
  ) {
    super(target, manager, queryRunner)
  }

  /**
   * Finds a user by the email address.
   * @param email - The email address of the user.
   * @returns A promise that resolves to the found user, or `null` if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.findOne({ where: { email } })
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`)
    }
  }

  /**
   * Finds a user by id.
   * @param id - The id of the user.
   * @returns A promise that resolves to the found user, or `null` if not found.
   */
  async findById(id: number): Promise<User | null> {
    try {
      return await this.findOne({ where: { id } })
    } catch (error) {
      throw new Error(`Error finding user by id: ${error.message}`)
    }
  }

  /**
   * Creates a new user.
   * @param user - The user data to be created.
   * @returns A promise that resolves to the created user.
   */
  async createUser(user: CreateUser): Promise<User> {
    const { name, email, password } = user

    try {
      const userInstance = this.create({ name, email, password })
      return await this.save(userInstance)
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`)
    }
  }

  /**
   * Updates a user by id.
   * @param id - The id of the user.
   * @param updateData - The partial user data to be updated.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async updateUserById(
    id: number,
    updateData: Partial<CreateUser>
  ): Promise<void> {
    try {
      await this.update(id, updateData)
    } catch (error) {
      throw new Error(`Error updating user by id: ${error.message}`)
    }
  }

  /**
   * Deletes a user by id.
   * @param id - The id of the user.
   * @returns A promise that resolves 'void' when the operation is complete.
   */
  async deleteUser(id: number): Promise<void> {
    try {
      await this.delete(id)
    } catch (error) {
      throw new Error(`Error deleting user by id: ${error.message}`)
    }
  }
}

/**
 * Creates repository of type `UserRepository`.
 * @param dataSource - The data source to be used.
 * @returns A `UserRepository`.
 */
export const createUserRepository = (
  dataSource: DataSource
): UserRepository => {
  const baseRepository = dataSource.getRepository(User)

  return new UserRepository(
    baseRepository.target,
    baseRepository.manager,
    baseRepository.queryRunner
  )
}
