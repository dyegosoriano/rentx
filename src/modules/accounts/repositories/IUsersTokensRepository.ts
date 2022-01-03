import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { IFindByUserIdAndRefreshTokenDTO } from '../dtos/IFindByUserIdAndRefreshTokenDTO'
import { UsersTokens } from '../infra/typeorm/entities/UsersTokens'

interface IUsersTokensRepository {
  findByUserIdAndRefreshToken({ refresh_token, user_id }: IFindByUserIdAndRefreshTokenDTO): Promise<UsersTokens>
  create({ refresh_token, expires_date, user_id }: ICreateUserTokenDTO): Promise<UsersTokens>
  findByRefreshToken(refresh_token: string): Promise<UsersTokens>
  deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }
