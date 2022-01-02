import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticateController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const authenticateRoutes = Router()

authenticateRoutes.post('/refresh-token', refreshTokenController.handle)
authenticateRoutes.post('/sessions', authenticateController.handle)

export { authenticateRoutes }
