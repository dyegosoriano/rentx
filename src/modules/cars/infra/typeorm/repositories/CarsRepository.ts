import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const { license_plate, description, category_id, fine_amount, daily_rate, brand, name } = data

    const car = this.repository.create({
      license_plate,
      description,
      category_id,
      fine_amount,
      daily_rate,
      brand,
      name
    })

    await this.repository.save(car)

    return car
  }

  async findByLicencePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }
}

export { CarsRepository }
