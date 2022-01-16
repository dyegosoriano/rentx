import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const createCarSpecificationController = new CreateCarSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()
const uploadCarImagesController = new UploadCarImagesController()
const createCarsController = new CreateCarController()

const carsRoutes = Router()
const upload = multer(uploadConfig)

carsRoutes
  .post('/images/:id', ensureAuthenticate, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)
  .post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle)
  .get('/available', ensureAuthenticate, listAvailableCarsController.handle)
  .post('/', ensureAuthenticate, ensureAdmin, createCarsController.handle)

export { carsRoutes }
