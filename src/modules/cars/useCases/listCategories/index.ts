import { CategoriesRepository } from '../../repositories/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

const listCategoryRepository = new CategoriesRepository()

const listCategoryUseCase = new ListCategoriesUseCase(listCategoryRepository)
const listCategoryController = new ListCategoriesController(listCategoryUseCase)

export { listCategoryController }
