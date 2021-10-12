import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const listAvailableCarsController = new ListAvailableCarsController()
const createCarsController = new CreateCarController()

const carsRoutes = Router()

carsRoutes.get('/available', ensureAuthenticate, listAvailableCarsController.handle)
carsRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarsController.handle)

export { carsRoutes }
