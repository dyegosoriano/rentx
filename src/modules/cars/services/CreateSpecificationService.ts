import { ISpecificationRepository } from '../repositories/ISpecificationRepository'

interface IRequest {
  description: string
  name: string
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ description, name }: IRequest): void {
    const specificationAlreadyExist = this.specificationRepository.findByName(name)
    if (specificationAlreadyExist) throw new Error('Specification already exist!')

    this.specificationRepository.create({ description, name })
  }
}

export { CreateSpecificationService }
