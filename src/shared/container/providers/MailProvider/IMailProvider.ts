interface ISendMail {
  subject: string
  body: string
  to: string
}

interface IMailProvider {
  sendMail({ subject, body, to }: ISendMail): Promise<void>
}

export { IMailProvider, ISendMail }
