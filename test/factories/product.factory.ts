import { faker } from '@faker-js/faker'
import { Product } from '../../src/models'

export const fakeProduct = (): Product => {
  const product: Product = {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    unitPrice: faker.number.int(),
    rating: faker.number.int({ max: 10 }),
    visible: true,
    type: 'TestType',
    imageUrl: faker.internet.url(),
    createdAt: new Date(),
    deletedAt: null
  }

  return product
}
