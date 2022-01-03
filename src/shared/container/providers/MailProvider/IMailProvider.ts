interface ISendMail {
  subject: string
  variables: any
  path: string
  to: string
}

interface IMailProvider {
  sendMail({ variables, subject, path, to }: ISendMail): Promise<void>
}

export { IMailProvider, ISendMail }
