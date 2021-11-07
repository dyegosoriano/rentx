import 'reflect-metadata'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import { AppError } from '@shared/errors/AppError'
import { routes } from '@shared/infra/http/routes'
import createConnection from '@shared/infra/typeorm'
import '@shared/container'

import swaggerFile from '../../../swagger.json'

const app = express()
createConnection()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message })
  }

  console.log(err.stack)

  return response.status(500).json({ status: 'error', message: 'Internal server error' })
})

export { app }
