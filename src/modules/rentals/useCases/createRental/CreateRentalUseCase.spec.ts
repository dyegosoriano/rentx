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

const rentalObject = { expected_return_date: dayjs().add(1, 'day').toDate(), user_id: '12345' }
let car

describe('Create Rental', () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()

    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)

    car = await carsRepositoryInMemory.create({
      description: 'Car test',
      license_plate: 'test',
      category_id: '1234',
      fine_amount: 40,
      daily_rate: 100,
      brand: 'brand',
      name: 'Test'
    })
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({ ...rentalObject, car_id: car.id })

    expect(rental).toHaveProperty('start_date')
    expect(rental).toHaveProperty('id')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({ ...rentalObject, car_id: car.id })

    await expect(
      createRentalUseCase.execute({ expected_return_date: new Date(), user_id: '12345', car_id: 'teste' })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({ ...rentalObject, car_id: car.id })

    await expect(
      createRentalUseCase.execute({ expected_return_date: new Date(), user_id: 'teste', car_id: car.id })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({ expected_return_date: dayjs().toDate(), user_id: 'teste', car_id: car.id })
    ).rejects.toEqual(new AppError('Invalid return time!'))
  })
})
