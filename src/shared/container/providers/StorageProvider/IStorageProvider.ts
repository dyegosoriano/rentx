interface IStorageProvider {
  delete(file: string, folder: string): Promise<void>
  save(file: string, folder: string): Promise<string>
}

export { IStorageProvider }
