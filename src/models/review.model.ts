import { Column, Entity, ManyToOne } from 'typeorm'
import { User, BaseEntity } from '.'

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {
  @ManyToOne(() => User, user => user.reviews, {
    nullable: false
  })
  user: User

  // @ManyToOne(() => Product, product => product.reviews)
  // product: Product

  @Column({
    comment: 'rating for the product',
    type: 'integer'
  })
  rating: number
}
