import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes
  .use('/specifications', specificationsRoutes)
  .use('/categories', categoriesRoutes)
  .use('/users', usersRoutes)
  .use(authenticateRoutes)

export { routes }
