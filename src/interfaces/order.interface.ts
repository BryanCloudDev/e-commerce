import { User } from '../models'

export interface CreateOrder {
  grandTotal: number
  itemCount: number
  shipping: number
  subTotal: number
  taxes: number
  user: User
}
