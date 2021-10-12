import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const createCarsController = new CreateCarController()

const carsRoutes = Router()

carsRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarsController.handle)

export { carsRoutes }
