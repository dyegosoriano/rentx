import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  constructor(private CreateSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { description, name } = request.body

    this.CreateSpecificationUseCase.execute({ description, name })

    return response.status(201).send()
  }
}

export { CreateSpecificationController }
