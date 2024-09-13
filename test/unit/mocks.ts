import { CreateOrder, CreateReview, CreateUser } from '../../src/interfaces'
import { InternalServerErrorException } from '../../src/helpers'
import { Order, Review, User } from '../../src/models'
import { OrderStatus } from '../../src/enums'

export const dummyUser: CreateUser = {
  email: 'test@example.com',
  name: 'John Doe',
  password: '1234567'
}

export const dummyResponseUser = (): User => {
  const user = new User()

  user.createdAt = new Date()
  user.deletedAt = new Date()
  user.email = 'test@example.com'
  user.id = 1
  user.name = 'John Doe'
  user.orders = []
  user.password = 's3cur3p455w0rd'
  user.reviews = []

  return user
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

export const dummyResponseReview = (): Review => {
  const review = new Review()

  review.createdAt = new Date()
  review.deletedAt = new Date()
  review.id = 1
  review.rating = 10

  return review
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

export const dummyResponseOrder = (): Order => {
  const order = new Order()

  order.createdAt = new Date()
  order.deletedAt = null
  order.id = 1
  order.placedAt = new Date()
  order.status = OrderStatus.Pending
  order.grandTotal = 34
  order.itemCount = 12
  order.shipping = 2
  order.subTotal = 31
  order.taxes = 2

  return order
}

export const errorMessage = 'Forced error for testing purposes'

export const httpException = new InternalServerErrorException(errorMessage)

export const mockFunction = <T extends (...args: any[]) => any>(fn: T) => {
  return fn as jest.MockedFunction<T>
}
