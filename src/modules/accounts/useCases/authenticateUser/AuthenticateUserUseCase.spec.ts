import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateUserCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserCase
let dateProvider: DayjsDateProvider

describe('Authenticate User', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()

    createUserUseCase = new CreateUserCase(usersRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000-123',
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

  it('should not be able to authenticate a n not existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        password: 'false@email.com',
        email: '1234'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000-123',
      email: 'user@test.com',
      name: 'User Test',
      password: '1234'
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        password: 'incorrectPassword',
        email: user.email
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })
})
