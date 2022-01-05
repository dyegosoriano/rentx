import { IMailProvider, ISendMail } from '../IMailProvider'

class MailProviderInMemory implements IMailProvider {
  private message: ISendMail[] = []

  async sendMail({ variables, subject, path, to }: ISendMail): Promise<void> {
    await this.message.push({ variables, subject, path, to })
  }
}

export { MailProviderInMemory }
