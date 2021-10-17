import { inject, injectable } from 'tsyringe'

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository'

interface IRequest {
  images_name: string[]
  car_id: string
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carImageRepository: ICarsImageRepository
  ) {}

  async execute({ images_name, car_id }: IRequest): Promise<void> {
    images_name.map(async image => await this.carImageRepository.create(car_id, image))
  }
}

export { UploadCarImagesUseCase }
