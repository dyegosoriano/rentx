import { Repository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { UsersTokens } from '../entities/UsersTokens'

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>

  async create({ refresh_token, expires_date, user_id }: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({ refresh_token, expires_date, user_id })
    await this.repository.save(userToken)
    return userToken
  }
}

export { UsersTokensRepository }
