import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  email: string
  sub: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { expires_refresh_token_days, expires_in_refresh_token, secret_refresh_token } = auth
    const { sub: user_id, email } = verify(token, secret_refresh_token) as IPayload

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken({ refresh_token: token, user_id })
    if (!userToken) throw new AppError('Refresh Token does not exists!')

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, secret_refresh_token, {
      expiresIn: expires_in_refresh_token,
      subject: user_id
    })

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({ refresh_token, expires_date, user_id })

    return refresh_token
  }
}

export { RefreshTokenUseCase }
