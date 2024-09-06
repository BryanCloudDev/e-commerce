import { faker } from '@faker-js/faker'
import { Product } from '../../src/models'

export const fakeProduct = (): Product => {
  const product: Product = {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    unit_price: faker.number.int(),
    rating: faker.number.int({ max: 10 }),
    visible: true,
    type: 'TestType',
    image_url: faker.internet.url(),
    createdAt: new Date(),
    deletedAt: null
  }

  return product
}
