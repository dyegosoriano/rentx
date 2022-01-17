import AWS from 'aws-sdk'
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider, ISendMail } from '../IMailProvider'

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new AWS.SES({
        region: process.env.AWS_REGION,
        apiVersion: '2010-12-01'
      })
    })
  }

  async sendMail({ variables, subject, path, to }: ISendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      from: 'Rentx <noreplay@rentx.com.br>',
      html: templateHTML,
      subject,
      to
    })
  }
}

export { SESMailProvider }
