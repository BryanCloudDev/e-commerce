import { faker } from '@faker-js/faker';

export const fakeProduct = (): object => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    unit_price: faker.number.int(),
    rating: faker.number.int({ max: 10 }),
    visible: true,
    type: 'TestType',
    image_url: faker.internet.url()
  };
};
