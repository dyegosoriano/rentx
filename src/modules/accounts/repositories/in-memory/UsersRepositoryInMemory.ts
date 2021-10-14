import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private repository: User[] = []

  async create({ driver_license, password, email, name }: ICreateUserDTO): Promise<void> {
    const user = new User()
    Object.assign(user, { driver_license, password, email, name })

    this.repository.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.repository.find(user => user.id === id)
  }
}

export { UsersRepositoryInMemory }
