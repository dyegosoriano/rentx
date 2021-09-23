import csvParse from 'csv-parse'
import fs from 'fs'

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'

interface IImportCategory {
  description: string
  name: string
}

class ImportCategoryUseCase {
  constructor(private CategoriesRepository: CategoriesRepository) {}

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

      const existCategory = this.CategoriesRepository.findByName(name)

      if (!existCategory) this.CategoriesRepository.create({ description, name })
    })
  }
}

export { ImportCategoryUseCase }
