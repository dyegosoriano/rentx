import { getRepository, Repository } from 'typeorm'

import { Specification } from '../../entities/Specification'
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ created_at: new Date(), description, name })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name })
  }
}

export { SpecificationRepository }
