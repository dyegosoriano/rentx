import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../erros/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class CreateUserCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ driver_licence, password, email, name }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if (userAlreadyExist) throw new AppError('User already exist')

    const passwordHash = await hash(password, 8)

    await this.userRepository.create({
      password: passwordHash,
      driver_licence,
      email,
      name
    })
  }
}

export { CreateUserCase }
