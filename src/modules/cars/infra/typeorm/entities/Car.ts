import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
class Car {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  daily_rate: number

  @Column()
  available: boolean

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    inverseJoinColumns: [{ name: 'specification_id' }],
    joinColumns: [{ name: 'car_id' }],
    name: 'specifications_cars'
  })
  specifications: Specification[]

  @Column()
  category_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.created_at = new Date()
      this.available = true
      this.id = uuid()
    }
  }
}

export { Car }
