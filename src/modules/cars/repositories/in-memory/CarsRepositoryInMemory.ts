import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create(data: ICreateCarDTO): Promise<Car> {
    const { license_plate, category_id, fine_amount, description, daily_rate, brand, name } = data
    const car = new Car()

    Object.assign(car, { license_plate, category_id, fine_amount, description, daily_rate, brand, name })

    this.cars.push(car)

    return car
  }

  async findByLicencePlate(license_plate: string): Promise<Car> {
    return this.cars.find(item => item.license_plate === license_plate)
  }
}

export { CarsRepositoryInMemory }
