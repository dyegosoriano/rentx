import { Category } from '@modules/cars/infra/typeorm/entities/Category'

import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()
    Object.assign(category, { description, name })
    this.categories.push(category)
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(item => item.name === name)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }
}

export { CategoriesRepositoryInMemory }
