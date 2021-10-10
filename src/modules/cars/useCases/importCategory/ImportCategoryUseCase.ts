import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'

interface IImportCategory {
  description: string
  name: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private CategoriesRepository: CategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      const stream = fs.createReadStream(file.path)
      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', line => {
          const [name, description] = line
          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', error => reject(error))
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async item => {
      const { description, name } = item

      const existCategory = await this.CategoriesRepository.findByName(name)

      if (!existCategory) await this.CategoriesRepository.create({ description, name })
    })
  }
}

export { ImportCategoryUseCase }
