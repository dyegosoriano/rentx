import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'

interface IRequest {
  description: string
  name: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExist = await this.specificationRepository.findByName(name)

    if (specificationAlreadyExist) throw new AppError('Specification already exist!')

    await this.specificationRepository.create({ description, name })
  }
}

export { CreateSpecificationUseCase }
