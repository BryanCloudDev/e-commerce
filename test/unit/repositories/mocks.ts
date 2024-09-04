import { CreateOrder, CreateReview, CreateUser } from '../../../src/interfaces'
import { User } from '../../../src/models'

export const dummyUser: CreateUser = {
  email: 'test-email@email.com',
  name: 'John Doe',
  password: '1234567'
}

export const dummyReview = (): CreateReview => {
  const user = new User()
  user.name = dummyUser.name
  user.email = dummyUser.email
  user.password = dummyUser.password

  return {
    rating: 10,
    user
  }
}

export const dummyOrder = (): CreateOrder => {
  const user = new User()
  user.name = dummyUser.name
  user.email = dummyUser.email
  user.password = dummyUser.password

  return {
    grandTotal: 34,
    itemCount: 12,
    shipping: 2,
    subTotal: 31,
    taxes: 2,
    user
  }
}

export const errorMessage = 'Forced error for testing purposes'
