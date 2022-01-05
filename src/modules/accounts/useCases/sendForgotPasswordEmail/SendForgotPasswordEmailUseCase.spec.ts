import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@shared/errors/AppError'

import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase'

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase
let usersTokensRepository: UsersTokensRepositoryInMemory
let usersRepository: UsersRepositoryInMemory
let mailProvider: MailProviderInMemory
let dateProvider: DayjsDateProvider

describe('SendForgotPasswordEmailUseCase', () => {
  beforeEach(async () => {
    usersTokensRepository = new UsersTokensRepositoryInMemory()
    usersRepository = new UsersRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    dateProvider = new DayjsDateProvider()

    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    )

    await usersRepository.create({
      driver_license: '123456',
      email: 'test@email.com',
      password: 'teste123',
      name: 'User Test'
    })
  })

  it('should be able to send a forgot password mail to user', async () => {
    const spy = spyOn(mailProvider, 'sendMail')

    await sendForgotPasswordEmailUseCase.execute('test@email.com')

    expect(spy).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordEmailUseCase.execute('test-not-exists@email.com')).rejects.toEqual(
      new AppError('User does not exists!')
    )
  })

  it('should be able to create an users token', async () => {
    const spy = spyOn(usersTokensRepository, 'create')

    await sendForgotPasswordEmailUseCase.execute('test@email.com')

    expect(spy).toHaveBeenCalled()
  })
})
