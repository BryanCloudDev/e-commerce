import { ProductType } from '../enums/product-type.enum'

export interface CreateProduct {
  name: string
  description: string
  unit_price: number
  rating: number
  visible: boolean
  type: ProductType
  image_url: string
}
