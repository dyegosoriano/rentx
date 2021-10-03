import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const avatarFile = request.file.filename
    const { id: user_id } = request.user

    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatar.execute({ avatarFile, user_id })

    return response.status(204).send()
  }
}

export { UpdateUserAvatarController }
