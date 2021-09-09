import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository'
import { Category } from '../model/Category'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = []

  constructor() {
    this.categories = []
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category()
    Object.assign(category, { created_at: new Date(), description, name })
    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    const category = this.categories.find(item => item.name === name)
    return category
  }
}

export { CategoriesRepository }
