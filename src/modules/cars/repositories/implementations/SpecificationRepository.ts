import { Specification } from '../../model/Specification'
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
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
