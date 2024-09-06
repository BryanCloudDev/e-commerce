import { factory, Product } from '../../test.helper'

describe('Product Model', () => {
  describe('attributes', () => {
    let product: Product | null

    beforeAll(() => {
      product = factory.fakeProduct()
    })

    it('should have a name', () => {
      expect(product.name).not.toBe(null)
      expect(typeof product.name).toBe('string')
    })

    it('should have a unit price', () => {
      expect(product.unit_price).not.toBe(null)
      expect(typeof product.unit_price).toBe('number')
    })

    it('should have a rating', () => {
      expect(product.rating).not.toBe(null)
      expect(typeof product.rating).toBe('number')
    })

    it('should have a type', () => {
      expect(product.type).not.toBe(null)
      expect(typeof product.type).toBe('string')
    })

    it('should have an image url', () => {
      expect(product.image_url).not.toBe(null)
      expect(typeof product.image_url).toBe('string')
    })

    afterAll(() => {
      product = null
    })
  })
})
