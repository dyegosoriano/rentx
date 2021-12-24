import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UsersTokens } from '../infra/typeorm/entities/UsersTokens'

interface IUsersTokensRepository {
  create({ refresh_token, expires_date, user_id }: ICreateUserTokenDTO): Promise<UsersTokens>
}

export { IUsersTokensRepository }
