import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface IFiles {
  filename: string
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const images = request.files as IFiles[]
    const { id } = request.params

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

    const images_name = images.map(file => file.filename)

    await uploadCarImageUseCase.execute({ car_id: id, images_name })

    return response.status(201).send()
  }
}

export { UploadCarImagesController }
