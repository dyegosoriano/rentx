import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/entities/Rental'

interface IRentalsRepository {
  create({ expected_return_date, user_id, car_id }: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  findOpenRentalByCar(car_id: string): Promise<Rental>
}

export { IRentalsRepository }
