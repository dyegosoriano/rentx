import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  password: string
  token: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)
    if (!userToken) throw new AppError('Token invalid!')

    const tokenExpired = this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())
    if (tokenExpired) throw new AppError('Token expired!')

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersTokensRepository.deleteById(userToken.id)
    await this.usersRepository.create(user)
  }
}

export { ResetPasswordUserUseCase }
