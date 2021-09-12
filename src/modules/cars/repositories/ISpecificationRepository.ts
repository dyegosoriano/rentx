import { Specification } from '../model/Specification'

interface ICreateSpecificationDTO {
  description: string
  name: string
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): void
  findByName(name: string): Specification
}

export { ISpecificationRepository, ICreateSpecificationDTO }
