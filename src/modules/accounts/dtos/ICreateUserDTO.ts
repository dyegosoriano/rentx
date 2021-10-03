interface ICreateUserDTO {
  driver_licence: string
  password: string
  avatar?: string
  email: string
  name: string
  id?: string
}

export { ICreateUserDTO }
