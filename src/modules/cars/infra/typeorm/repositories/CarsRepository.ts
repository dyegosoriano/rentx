import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IFindAvailableDTO } from '@modules/cars/dtos/IFindAvailableDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const { license_plate, specifications, description, category_id, fine_amount, daily_rate, brand, name, id } = data

    const car = this.repository.create({
      license_plate,
      specifications,
      description,
      category_id,
      fine_amount,
      daily_rate,
      brand,
      name,
      id
    })

    await this.repository.save(car)

    return car
  }

  async findByLicencePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id)
  }

  async findAvailable({ category_id, brand, name }: IFindAvailableDTO): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder('c').where('available = :available', { available: true })

    if (category_id) carsQuery.andWhere('category_id = :category_id', { category_id })
    if (brand) carsQuery.andWhere('brand = :brand', { brand })
    if (name) carsQuery.andWhere('name = :name', { name })

    return await carsQuery.getMany()
  }
}

export { CarsRepository }
