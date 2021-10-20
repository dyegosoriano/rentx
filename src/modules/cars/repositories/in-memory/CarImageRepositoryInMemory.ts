import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'

import { ICarsImageRepository } from '../ICarsImageRepository'

class CarImageRepositoryInMemory implements ICarsImageRepository {
  private carImage: CarImage[] = []

  async create(car_id: string, image_name: string): Promise<CarImage> {
    throw new Error('Method not implemented.')
  }
}

export { CarImageRepositoryInMemory }
