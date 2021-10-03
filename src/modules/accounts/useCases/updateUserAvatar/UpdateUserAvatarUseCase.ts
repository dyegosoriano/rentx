import { inject, injectable } from 'tsyringe'

import { deleteFiles } from '../../../../utils/file'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  avatarFile: string
  user_id: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ avatarFile, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user.avatar) await deleteFiles(`./tmp/avatar/${user.avatar}`)

    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }
