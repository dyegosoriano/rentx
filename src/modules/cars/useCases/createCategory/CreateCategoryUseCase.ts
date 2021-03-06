import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  description: string
  name: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) throw new AppError('Category already exist!')

    await this.categoriesRepository.create({ description, name })
  }
}

export { CreateCategoryUseCase }
