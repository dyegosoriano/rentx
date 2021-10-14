import { Specification } from '../infra/typeorm/entities/Specification'

interface ICreateSpecificationDTO {
  description: string
  name: string
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
  findByName(name: string): Promise<Specification>
}

export { ISpecificationRepository, ICreateSpecificationDTO }
