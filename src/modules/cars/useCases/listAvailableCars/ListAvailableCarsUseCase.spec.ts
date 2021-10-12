import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

const carOne = {
  description: 'Description carOne.',
  category_id: 'categoryOne',
  license_plate: 'DF-1234',
  brand: 'brandOne',
  fine_amount: 100,
  daily_rate: 165,
  name: 'carOne'
}

const carTwo = {
  description: 'Description carTwo.',
  category_id: 'categoryTwo',
  license_plate: 'DF-4321',
  brand: 'brandTwo',
  fine_amount: 100,
  daily_rate: 165,
  name: 'carTwo'
}

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const carCreated = await carsRepositoryInMemory.create(carOne)
    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([carCreated])
  })

  it('should be able to list all available cars by brand', async () => {
    const carCreated = await carsRepositoryInMemory.create(carOne)
    await carsRepositoryInMemory.create(carTwo)

    const cars = await listAvailableCarsUseCase.execute({ brand: 'brandOne' })

    expect(cars).toEqual([carCreated])
  })

  it('should be able to list all available cars by name', async () => {
    const carCreated = await carsRepositoryInMemory.create(carOne)
    await carsRepositoryInMemory.create(carTwo)

    const cars = await listAvailableCarsUseCase.execute({ name: 'carOne' })

    expect(cars).toEqual([carCreated])
  })

  it('should be able to list all available cars by category', async () => {
    const carCreated = await carsRepositoryInMemory.create(carOne)
    await carsRepositoryInMemory.create(carTwo)

    const cars = await listAvailableCarsUseCase.execute({ category_id: 'categoryOne' })

    expect(cars).toEqual([carCreated])
  })
})
