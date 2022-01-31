import { NextFunction, Request, Response } from 'express'

import { AppError } from '@shared/errors/AppError'

export default {
  notFound(_request: Request, _response: Response, _next: NextFunction) {
    throw new AppError('Route not found', 404)
  },

  globalErrors(err: Error, _request: Request, response: Response, _next: NextFunction) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    console.log(err.stack)

    return response.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
