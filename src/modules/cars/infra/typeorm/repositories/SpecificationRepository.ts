import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO, ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'

import { Specification } from '../entities/Specification'

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ created_at: new Date(), description, name })
    await this.repository.save(specification)
    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name })
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids)
  }
}

export { SpecificationRepository }
