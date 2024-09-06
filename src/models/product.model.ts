import { Column, Entity } from 'typeorm'
import { BaseEntity } from './'

@Entity({ name: 'products' })
export abstract class Product extends BaseEntity {
  // Attributes
  @Column({
    comment: 'product name',
    length: 99,
    type: 'varchar',
    nullable: false
  })
  name: string

  @Column({
    comment: 'product description',
    type: 'text',
    nullable: false
  })
  description: string

  @Column({
    comment: 'product price',
    type: 'decimal',
    nullable: false
  })
  unit_price: number

  @Column({
    comment: 'product rating',
    type: 'decimal',
    default: 0.0,
    nullable: true
  })
  rating: number

  @Column({
    comment: 'product visibility',
    type: 'boolean',
    default: false,
    nullable: true
  })
  visible: boolean

  @Column({
    comment: 'product type',
    type: 'varchar',
    nullable: false
  })
  type: string

  @Column({
    comment: 'product image url',
    type: 'varchar',
    nullable: false
  })
  image_url: string

  // Relations
  // @OneToMany(() => Review, review => review.product)
  // reviews: Review[]
}
