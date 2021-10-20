import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase

const rentalObject = {
  expected_return_date: new Date(),
  user_id: '12345',
  car_id: '54321'
}

describe('Create Rental', () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
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
})
