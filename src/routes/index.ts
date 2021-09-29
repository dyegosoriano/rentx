import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/specifications', specificationsRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/users', usersRoutes)

export { routes }
