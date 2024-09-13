import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity, Order } from './'

@Entity({ name: 'products_order' })
export class ProductOrder extends BaseEntity {
  @Column({
    comment: 'amount of products requested in order',
    type: 'integer',
    nullable: false
  })
  amount: number

  @ManyToOne(() => Order, order => order.productsOrder, {
    nullable: false
  })
  order: Order

  // @ManyToMany(() => Product, product => product.productsOrder, {
  //   nullable: false
  // })
  // @JoinTable()
  // product: Product
}
