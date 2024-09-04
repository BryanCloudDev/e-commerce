import { User } from '../models'

export interface CreateReview {
  rating: number
  user: User
}
