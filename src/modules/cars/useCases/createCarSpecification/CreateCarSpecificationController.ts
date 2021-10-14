import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specifications_id } = request.body
    const { id: car_id } = request.params

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

    const cars = await createCarSpecificationUseCase.execute({ specifications_id, car_id })

    return response.status(201).json(cars)
  }
}

export { CreateCarSpecificationController }
