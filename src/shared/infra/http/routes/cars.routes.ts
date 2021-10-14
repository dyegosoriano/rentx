import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const createCarSpecificationController = new CreateCarSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarsController = new CreateCarController()

const carsRoutes = Router()

carsRoutes
  .post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle)
  .get('/available', ensureAuthenticate, listAvailableCarsController.handle)
  .post('/', ensureAuthenticate, ensureAdmin, createCarsController.handle)

export { carsRoutes }
