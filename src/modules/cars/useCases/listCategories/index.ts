import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

const listCategoryRepository = CategoriesRepository.getInstance()

const listCategoryUseCase = new ListCategoriesUseCase(listCategoryRepository)
const listCategoryController = new ListCategoriesController(listCategoryUseCase)

export { listCategoryController }
