import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'

const routes = Router()

routes.use('/specifications', specificationsRoutes)
routes.use('/categories', categoriesRoutes)

export default routes
