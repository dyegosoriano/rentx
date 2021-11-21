import dayjs from 'dayjs'

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider

const rentalObject = {
  expected_return_date: dayjs().add(1, 'day').toDate(),
  user_id: '12345',
  car_id: '54321'
}

describe('Create Rental', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()

    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute(rentalObject)

    expect(rental).toHaveProperty('start_date')
    expect(rental).toHaveProperty('id')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute(rentalObject)
      await createRentalUseCase.execute({ expected_return_date: new Date(), user_id: '12345', car_id: 'teste' })
    }).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute(rentalObject)
      await createRentalUseCase.execute({ expected_return_date: new Date(), user_id: 'teste', car_id: '54321' })
    }).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({ expected_return_date: dayjs().toDate(), user_id: 'teste', car_id: '54321' })
    }).rejects.toEqual(new AppError('Invalid return time!'))
  })
})
