interface ICreateCarDTO {
  license_plate: string
  category_id: string
  description: string
  fine_amount: number
  daily_rate: number
  brand: string
  name: string
}

export { ICreateCarDTO }
