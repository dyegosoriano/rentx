import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const updateUserAvatarController = new UpdateUserAvatarController()
const createUserController = new CreateUserController()

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch('/', ensureAuthenticate, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

export { usersRoutes }
