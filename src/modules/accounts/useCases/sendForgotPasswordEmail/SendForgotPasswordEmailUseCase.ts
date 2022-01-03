import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class SendForgotPasswordEmailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('User does not exists!')

    const expires_date = this.dateProvider.addHours(3)
    const token = uuid()

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs')
    const variables = { name: user.name, link: `${process.env.API_URL}/password/reset?token=${token}` }

    await this.usersTokensRepository.create({ refresh_token: token, user_id: user.id, expires_date })

    this.mailProvider.sendMail({ subject: 'Recuperação de senha', to: email, variables, path: templatePath })
  }
}

export { SendForgotPasswordEmailUseCase }
