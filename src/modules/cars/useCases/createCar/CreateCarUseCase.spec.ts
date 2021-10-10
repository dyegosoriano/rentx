import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarUseCase } from './CreateCarUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase

const carObject = {
  description: 'Description Car',
  license_plate: 'ABC-1234',
  category_id: 'category',
  name: 'Name Car',
  fine_amount: 60,
  daily_rate: 100,
  brand: 'Brand'
}

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(carObject)
    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with exists licence plate', async () => {
    expect(async () => {
      await createCarUseCase.execute(carObject)
      await createCarUseCase.execute(carObject)
    }).rejects.toEqual(new AppError('Car already exist!'))
  })

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(carObject)
    expect(car.available).toBe(true)
  })
})
