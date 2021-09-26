import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export default (): ListCategoriesController => {
  const listCategoryRepository = new CategoriesRepository()

  const listCategoryUseCase = new ListCategoriesUseCase(listCategoryRepository)
  const listCategoryController = new ListCategoriesController(listCategoryUseCase)

  return listCategoryController
}
