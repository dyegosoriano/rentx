import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { driver_licence, password, email, name } = request.body

    const createUserUseCase = container.resolve(CreateUserCase)

    await createUserUseCase.execute({ driver_licence, password, email, name })

    return response.status(201).send()
  }
}

export { CreateUserController }
