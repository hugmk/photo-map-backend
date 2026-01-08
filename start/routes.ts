/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const PhotosController = () => import('#controllers/photos_controller')

router.get('/', async () => {
  return {
    message: 'Welcome to the Photo Map API',
  }
})

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

router.post('/photos', [PhotosController, 'store']).use(middleware.auth())
router.get('/photos', [PhotosController, 'index']).use(middleware.auth())
