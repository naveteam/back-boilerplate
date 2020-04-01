import Router from 'koa-router'

import UserController from 'controllers/users-controller'
import UserValidate from 'validators/users-schema'

const router = new Router()

router.get('/users', UserController.index)

router.post('/users/signup', UserValidate.create(), UserController.create)
router.post('/users/login', UserController.login)
router.post('/users/forget', UserController.forget)
router.post('/users/reset', UserController.reset)

router.get('/users/:id', UserController.show)
router.put('/users/:id', UserValidate.update(), UserController.update)
router.delete('/users/:id', UserController.destroy)

export default router.routes()
