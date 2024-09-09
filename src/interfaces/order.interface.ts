import { User } from '../models'

export interface CreateOrder {
  grandTotal: number
  itemCount: number
  shipping: number
  subTotal: number
  taxes: number
  user: User
}

// https://www.typescriptlang.org/docs/handbook/utility-types.html
export type ResponseOrder = Omit<CreateOrder, 'user'>
