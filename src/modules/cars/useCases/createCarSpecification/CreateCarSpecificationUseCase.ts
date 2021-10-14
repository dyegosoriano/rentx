import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  specifications_id: string[]
  car_id: string
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ specifications_id, car_id }: IRequest): Promise<Car> {
    const carAlreadyExist = await this.carsRepository.findById(car_id)
    if (!carAlreadyExist) throw new AppError('Car does not exists!')

    const specifications = await this.specificationRepository.findByIds(specifications_id)

    carAlreadyExist.specifications = specifications

    return await this.carsRepository.create(carAlreadyExist)
  }
}

export { CreateCarSpecificationUseCase }
