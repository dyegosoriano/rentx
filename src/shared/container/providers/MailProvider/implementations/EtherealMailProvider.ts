import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider, ISendMail } from '../IMailProvider'

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          secure: account.smtp.secure,
          host: account.smtp.host,
          port: account.smtp.port,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(error => console.log(error))
  }

  async sendMail({ subject, body, to }: ISendMail): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Rentx <noreplay@rentx.com.br>',
      text: body,
      html: body,
      subject,
      to
    })

    console.log('Message URL: ', nodemailer.getTestMessageUrl(message))
    console.log('Message send: ', message.messageId)
  }
}

export { EtherealMailProvider }
