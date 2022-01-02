import { getRepository, Repository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IFindByUserIdAndRefreshTokenDTO } from '@modules/accounts/dtos/IFindByUserIdAndRefreshTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { UsersTokens } from '../entities/UsersTokens'

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>

  constructor() {
    this.repository = getRepository(UsersTokens)
  }

  async create({ refresh_token, expires_date, user_id }: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({ refresh_token, expires_date, user_id })
    await this.repository.save(userToken)
    return userToken
  }

  async findByUserIdAndRefreshToken({ refresh_token, user_id }: IFindByUserIdAndRefreshTokenDTO): Promise<UsersTokens> {
    return await this.repository.findOne({ refresh_token, user_id })
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { UsersTokensRepository }
