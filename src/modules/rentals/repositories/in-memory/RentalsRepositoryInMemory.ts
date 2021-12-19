import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'

import { IRentalsRepository } from '../IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  private repository: Rental[] = []

  async create({ expected_return_date, user_id, car_id }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, { expected_return_date, user_id, car_id, start_date: new Date() })
    this.repository.push(rental)
    return rental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.find(rental => rental.user_id === user_id && !rental.end_date)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.find(rental => rental.car_id === car_id && !rental.end_date)
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.filter(rental => rental.user_id === user_id)
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.find(rental => rental.id === id)
  }
}

export { RentalsRepositoryInMemory }
