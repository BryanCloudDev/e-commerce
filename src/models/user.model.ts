import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// sample
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  name: string

  @Column()
  email: string
}
