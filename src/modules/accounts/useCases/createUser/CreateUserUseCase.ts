import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserRepository } from '../../repositories/IUserRepository'

@injectable()
class CreateUserCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ driver_licence, password, email, name }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(email)
    if (userAlreadyExist) throw new Error('User already exist')

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
