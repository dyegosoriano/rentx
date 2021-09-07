import express from 'express'

import { categoriesRoutes } from './routes/categories.route'

const port = process.env.PORT || 3333
const app = express()

app.use(express.json())

app.use('/categories', categoriesRoutes)

app.listen(port, () => console.log(`🚀  Server is running port: ${port}`))
