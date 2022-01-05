import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IFindByUserIdAndRefreshTokenDTO } from '@modules/accounts/dtos/IFindByUserIdAndRefreshTokenDTO'
import { UsersTokens } from '@modules/accounts/infra/typeorm/entities/UsersTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private repository: UsersTokens[] = []

  async create({ refresh_token, expires_date, user_id }: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens()

    Object.assign(userToken, { refresh_token, expires_date, user_id })

    this.repository.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken({ refresh_token, user_id }: IFindByUserIdAndRefreshTokenDTO): Promise<UsersTokens> {
    return this.repository.find(item => item.refresh_token === refresh_token && item.user_id === user_id)
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    return this.repository.find(item => item.refresh_token === refresh_token)
  }

  async deleteById(id: string): Promise<void> {
    this.repository = this.repository.filter(item => item.id !== id)
  }
}

export { UsersTokensRepositoryInMemory }
