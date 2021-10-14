import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { IFindAvailableDTO } from '../dtos/IFindAvailableDTO'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarsRepository {
  findByLicencePlate(license_plate: string): Promise<Car>
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>
  create(data: ICreateCarDTO): Promise<Car>
  findById(id: string): Promise<Car>
}

export { ICarsRepository }
