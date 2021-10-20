import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  expected_return_date: Date
  user_id: string
  car_id: string
}

dayjs.extend(utc)

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({ expected_return_date, user_id, car_id }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if (carUnavailable) throw new AppError('Car is unavailable')

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
    if (rentalOpenToUser) throw new AppError("There's a rental in progress for user!")

    const expectedReturnDateFormatted = dayjs(expected_return_date).utc().local().format()
    const dateNow = dayjs().utc().local().format()

    const compare = dayjs(expectedReturnDateFormatted).diff(dateNow, 'hours')
    const minimumHour = 24

    if (compare < minimumHour) throw new AppError('Invalid return time!')

    return await this.rentalsRepository.create({ expected_return_date, user_id, car_id })
  }
}

export { CreateRentalUseCase }
