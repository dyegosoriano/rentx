import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const updateUserAvatarController = new UpdateUserAvatarController()
const createUserController = new CreateUserController()
const profileUserController = new ProfileUserController()

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig)

usersRoutes
  .patch('/', ensureAuthenticate, uploadAvatar.single('avatar'), updateUserAvatarController.handle)
  .get('/profile', ensureAuthenticate, profileUserController.handle)
  .post('/', createUserController.handle)

export { usersRoutes }
