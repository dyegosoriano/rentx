import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let specificationRepositoryInMemory: SpecificationRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRepositoryInMemory: CarsRepositoryInMemory

const carOne = {
  specifications: [],
  description: 'Description carOne.',
  category_id: 'categoryOne',
  license_plate: 'DF-1234',
  brand: 'brandOne',
  fine_amount: 100,
  daily_rate: 165,
  name: 'carOne'
}

describe('Create Car Specification', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    carRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificationRepositoryInMemory,
      carRepositoryInMemory
    )
  })

  it('should not be able to add a new specification to a now-existent car', () => {
    expect(async () => {
      const specifications_id = ['123']
      const car_id = '123'

      await createCarSpecificationUseCase.execute({ specifications_id, car_id })
    }).rejects.toEqual(new AppError('Car does not exists!'))
  })

  it('should be able to create car specification', async () => {
    const specification = await specificationRepositoryInMemory.create({
      description: 'Description test.',
      name: 'Name test'
    })

    const car = await carRepositoryInMemory.create(carOne)
    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({ specifications_id, car_id: car.id })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
