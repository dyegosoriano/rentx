import { Router } from 'express'

import { SendForgotPasswordEmailController } from '@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController'

const sendForgotPasswordMailController = new SendForgotPasswordEmailController()

const passwordRoutes = Router()

passwordRoutes.post('/', sendForgotPasswordMailController.handle)

export { passwordRoutes }
