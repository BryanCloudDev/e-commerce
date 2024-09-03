import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity, Order, Review } from './'
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    comment: 'user name',
    length: 50,
    type: 'varchar',
    default: 'John Doe'
  })
  name: string

  @Column({
    comment: 'user email',
    length: 60,
    nullable: false,
    type: 'varchar',
    unique: true
  })
  email: string

  @Column({
    comment: 'user password',
    type: 'varchar',
    nullable: false
  })
  password: string

  // relations
  @OneToMany(() => Order, order => order.user)
  orders: Order[]

  @OneToMany(() => Review, review => review.user)
  reviews: Review[]
}
