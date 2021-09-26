import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  constructor(private CreateCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    await this.CreateCategoryUseCase.execute({ description, name })

    return response.status(201).send()
  }
}

export { CreateCategoryController }
