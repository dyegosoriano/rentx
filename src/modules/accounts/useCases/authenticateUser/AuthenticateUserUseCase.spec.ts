import { AppError } from '@errors/AppError'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { CreateUserCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_licence: '000-123',
      email: 'user@test.com',
      name: 'User Test',
      password: '1234'
    }

    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      password: user.password,
      email: user.email
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a n not existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        password: 'false@email.com',
        email: '1234'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_licence: '000-123',
        email: 'user@test.com',
        name: 'User Test',
        password: '1234'
      }

      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        password: 'incorrectPassword',
        email: user.email
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
