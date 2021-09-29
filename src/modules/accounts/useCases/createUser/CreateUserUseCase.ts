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
    await this.userRepository.create({ driver_licence, password, email, name })
  }
}

export { CreateUserCase }
