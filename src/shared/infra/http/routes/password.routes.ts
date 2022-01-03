import { Router } from 'express'

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordEmailController } from '@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController'

const sendForgotPasswordMailController = new SendForgotPasswordEmailController()
const resetPasswordUserController = new ResetPasswordUserController()

const passwordRoutes = Router()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordUserController.handle)

export { passwordRoutes }
