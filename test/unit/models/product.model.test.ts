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
      expect(product.unitPrice).not.toBe(null)
      expect(typeof product.unitPrice).toBe('number')
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
      expect(product.imageUrl).not.toBe(null)
      expect(typeof product.imageUrl).toBe('string')
    })

    afterAll(() => {
      product = null
    })
  })
})
