// import { User } from "./user.model"
import { Column, Entity, ManyToOne } from 'typeorm'
import { OrderStatus } from '../enums'
import { BaseEntity, User } from './'

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({
    comment: 'total amount after all charges involved in the order',
    name: 'grand_total',
    type: 'float'
  })
  grandTotal: number

  @Column({
    comment: 'amount of items in the order',
    name: 'item_count',
    type: 'integer'
  })
  itemCount: number

  @Column({
    comment: 'date when the order was placed',
    name: 'placed_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  placedAt: Date

  @Column({
    comment: 'amount for delivery service',
    type: 'float'
  })
  shipping: number

  @Column({
    comment: 'status of the order',
    default: OrderStatus.Pending,
    enum: OrderStatus,
    type: 'enum'
  })
  status: OrderStatus

  @Column({
    comment: 'amount before taxes and shipping',
    name: 'sub_total',
    type: 'float'
  })
  subTotal: number

  @Column({
    comment: 'taxes applied to the order',
    type: 'float'
  })
  taxes: number

  // relations

  // In TypeORM, we don't explicitly define `user_id`. The ORM assumes that the property `user`
  // refers to the user ID. In the database, it will be stored as `user_id`, but in the code,
  // we use `user`. Feel free to delete this comment if it's clear enough.
  @ManyToOne(() => User, user => user.orders, {
    nullable: false
  })
  user: User
}
