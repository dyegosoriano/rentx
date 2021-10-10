import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

interface IRequest {
  password: string
  email: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AppError('Email or password incorrect!')

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError('Email or password incorrect!')

    const token = sign({}, 'ea4c8eec8d9652db33710edfccd5db37', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user: {
        email: user.email,
        name: user.name
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }
