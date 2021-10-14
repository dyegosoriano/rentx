import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IFindAvailableDTO } from '@modules/cars/dtos/IFindAvailableDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = []

  async create(data: ICreateCarDTO): Promise<Car> {
    const { license_plate, specifications, category_id, fine_amount, description, daily_rate, brand, name, id } = data
    const car = new Car()

    Object.assign(car, {
      license_plate,
      specifications,
      category_id,
      fine_amount,
      description,
      daily_rate,
      brand,
      name,
      id
    })

    this.cars.push(car)

    return car
  }

  async findByLicencePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
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
