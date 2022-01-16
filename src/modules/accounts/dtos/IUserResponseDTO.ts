interface IUserResponseDTO {
  driver_license: string
  avatar: string
  email: string
  name: string
  id: string

  avatar_url(): string
}

export { IUserResponseDTO }
