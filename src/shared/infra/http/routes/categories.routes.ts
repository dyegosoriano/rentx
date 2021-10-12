import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoriesController()

const categoriesRoutes = Router()
const upload = multer({
  dest: './tmp'
})

categoriesRoutes
  .post('/import', ensureAuthenticate, ensureAdmin, upload.single('file'), importCategoryController.handle)
  .post('/', ensureAuthenticate, ensureAdmin, createCategoryController.handle)
  .get('/', listCategoryController.handle)

export { categoriesRoutes }
