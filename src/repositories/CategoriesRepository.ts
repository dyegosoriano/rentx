import { Category } from '../model/Category'

interface ICreateCategoryDTO {
  description: string
  name: string
}

class CategoriesRepository {
  private categories: Category[] = []

  constructor() {
    this.categories = []
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, { created_at: new Date(), description, name })

    this.categories.push(category)
  }
}

export { CategoriesRepository }
