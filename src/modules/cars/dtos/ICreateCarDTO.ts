import { Specification } from '../infra/typeorm/entities/Specification'

interface ICreateCarDTO {
  specifications?: Specification[]
  license_plate: string
  category_id: string
  description: string
  fine_amount: number
  daily_rate: number
  brand: string
  name: string
  id?: string
}

export { ICreateCarDTO }
