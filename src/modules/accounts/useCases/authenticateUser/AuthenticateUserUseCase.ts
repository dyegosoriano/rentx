import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  password: string
  email: string
}

interface IResponse {
  refresh_token: string
  token: string
  user: {
    name: string
    email: string
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new AppError('Email or password incorrect!')

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new AppError('Email or password incorrect!')

    const token = sign({}, auth.secret_token, {
      expiresIn: auth.expires_in_token,
      subject: user.id
    })

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      expiresIn: auth.expires_in_refresh_token,
      subject: user.id
    })

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date
    })

    return {
      user: { email: user.email, name: user.name },
      refresh_token,
      token
    }
  }
}

export { AuthenticateUserUseCase }
