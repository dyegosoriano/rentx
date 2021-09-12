import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  constructor(private CreateCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    this.CreateCategoryUseCase.execute({ description, name })

    return response.status(201).send()
  }
}

export { CreateCategoryController }
