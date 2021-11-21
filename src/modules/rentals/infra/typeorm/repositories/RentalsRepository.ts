import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({ expected_return_date, end_date, user_id, car_id, total, id }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ expected_return_date, end_date, user_id, car_id, total, id })
    await this.repository.save(rental)
    return rental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id, end_date: null } })
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id, end_date: null } })
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id)
  }
}

export { RentalsRepository }
