import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { IFindAvailableDTO } from '../dtos/IFindAvailableDTO'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarsRepository {
  updateAvailable(id: string, available: boolean): Promise<void>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>
  create(data: ICreateCarDTO): Promise<Car>
  findById(id: string): Promise<Car>
}

export { ICarsRepository }
