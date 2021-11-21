interface ICreateRentalDTO {
  expected_return_date: Date
  user_id: string
  car_id: string

  end_date?: Date
  total?: number
  id?: string
}

export { ICreateRentalDTO }
