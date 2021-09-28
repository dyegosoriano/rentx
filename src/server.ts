import 'reflect-metadata'
import './shared/container'
import './database'

import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { routes } from './routes'
import swaggerFile from './swagger.json'

const port = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)

app.listen(port, () => console.log(`🚀 Server is running port: ${port}`))
