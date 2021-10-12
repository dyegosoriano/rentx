interface ICreateUserDTO {
  driver_license: string
  password: string
  avatar?: string
  email: string
  name: string
  id?: string
}

export { ICreateUserDTO }
