import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IFindAvailableDTO } from '@modules/cars/dtos/IFindAvailableDTO'
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

  async findAvailable({ category_id, brand, name }: IFindAvailableDTO): Promise<Car[]> {
    let all

    if (!category_id && !brand && !name) {
      all = this.cars.filter(car => car.available === true)
    } else {
      if (category_id) all = this.cars.filter(car => car.available === true && car.category_id === category_id)
      if (brand) all = this.cars.filter(car => car.available === true && car.brand === brand)
      if (name) all = this.cars.filter(car => car.available === true && car.name === name)
    }

    return all
  }
}

export { CarsRepositoryInMemory }
