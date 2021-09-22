import { Router } from 'express'

import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

const specificationRepository = new SpecificationRepository()
const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
  const { description, name } = request.body

  const createSpecificationService = new CreateSpecificationService(specificationRepository)
  createSpecificationService.execute({ description, name })

  return response.status(201).send()
})

export { specificationsRoutes }
