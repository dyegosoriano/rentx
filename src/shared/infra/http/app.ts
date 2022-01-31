import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import express from 'express'
import swaggerUi from 'swagger-ui-express'

import upload from '@config/upload'
import { routes } from '@shared/infra/http/routes'
import createConnection from '@shared/infra/typeorm'
import '@shared/container'

import errorHanding from './middlewares/errorHandling'
import swaggerFile from './swagger.json'

const app = express()
createConnection()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))
app.use(routes)

app.use(errorHanding.notFound)
app.use(errorHanding.globalErrors)

export { app }
