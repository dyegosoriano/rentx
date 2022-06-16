import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private CategoriesRepository: CategoriesRepository
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const stream = fs.createReadStream(file.path)
    const parseFile = csvParse()

    stream.pipe(parseFile)

    parseFile
      .on('data', async line => {
        const [name, description] = line

        const existCategory = await this.CategoriesRepository.findByName(name)
        if (!existCategory) await this.CategoriesRepository.create({ description, name })
      })
      .on('end', () => fs.promises.unlink(file.path))
      .on('error', error => {
        fs.promises.unlink(file.path)
        console.log(error)
      })
  }
}

export { ImportCategoryUseCase }
