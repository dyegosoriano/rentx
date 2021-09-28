import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUserRepository } from '../IUserRepository'

class UsersRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ driver_licence, user_name, password, email, name }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driver_licence,
      user_name,
      password,
      email,
      name
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }
