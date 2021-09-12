import { Router } from 'express'

import { specificationsRoutes } from './specifications.routes'
import { categoriesRoutes } from './categories.route'

const routes = Router()

routes.use('/specifications', specificationsRoutes)
routes.use('/categories', categoriesRoutes)

export default routes
