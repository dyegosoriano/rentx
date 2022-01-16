import { instanceToInstance } from 'class-transformer'

import { IUserResponseDTO } from '../dtos/IUserResponseDTO'
import { User } from '../infra/typeorm/entities/User'

class UserMap {
  static toDTO({ driver_license, avatar_url, avatar, email, name, id }: User): IUserResponseDTO {
    const user = instanceToInstance({ id, name, email, driver_license, avatar, avatar_url })

    return user
  }
}

export { UserMap }
