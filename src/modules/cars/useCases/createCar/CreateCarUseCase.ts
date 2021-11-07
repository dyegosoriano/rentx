import { inject, injectable } from 'tsyringe'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: ICreateCarDTO): Promise<Car> {
    const { license_plate, category_id, description, fine_amount, daily_rate, brand, name } = data

    const carAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate)
    if (carAlreadyExist) throw new AppError('Car already exist!')

    const car = await this.carsRepository.create({
      license_plate,
      description,
      category_id,
      fine_amount,
      daily_rate,
      brand,
      name
    })

    return car
  }
}

export { CreateCarUseCase }
