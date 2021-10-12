import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const createSpecificationController = new CreateSpecificationController()

const specificationsRoutes = Router()

specificationsRoutes.post('/', ensureAuthenticate, ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }
