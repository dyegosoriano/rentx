import { Router } from 'express'

import { categoriesRoutes } from './categories.route'

const routes = Router()

routes.use('/categories', categoriesRoutes)

export default routes
