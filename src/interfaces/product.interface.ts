import { ProductType } from '../enums/product-type.enum'

export interface CreateProduct {
  name: string
  description: string
  unitPrice: number
  rating: number
  visible: boolean
  type: ProductType
  imageUrl: string
}
