import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { passwordRoutes } from './password.routes'
import { rentalRoutes } from './rental.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes
  .use('/specifications', specificationsRoutes)
  .use('/categories', categoriesRoutes)
  .use('/forgot', passwordRoutes)
  .use('/rental', rentalRoutes)
  .use('/users', usersRoutes)
  .use('/cars', carsRoutes)
  .use(authenticateRoutes)

export { routes }
