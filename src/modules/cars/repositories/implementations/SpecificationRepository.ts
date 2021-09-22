import { Specification } from '../../model/Specification'
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[]

  private static INSTANCE: SpecificationRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository()
    }

    return SpecificationRepository.INSTANCE
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification()
    Object.assign(specification, { created_at: new Date(), description, name })
    this.specifications.push(specification)
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(item => item.name === name)
    return specification
  }
}

export { SpecificationRepository }
