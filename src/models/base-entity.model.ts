import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({
    name: 'created_at',
    comment: 'date when register was created'
  })
  createdAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: 'date when register was deleted'
  })
  deletedAt: Date
}
