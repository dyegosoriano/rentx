import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  description: string
  name: string
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) throw new Error('Category already exist!')

    this.categoriesRepository.create({ description, name })
  }
}

export { CreateCategoryUseCase }
