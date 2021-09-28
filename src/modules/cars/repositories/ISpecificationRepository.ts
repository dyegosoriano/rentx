import { Specification } from '../entities/Specification'

interface ICreateSpecificationDTO {
  description: string
  name: string
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
}

export { ISpecificationRepository, ICreateSpecificationDTO }
