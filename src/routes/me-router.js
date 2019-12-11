import Router from 'koa-router'

import MeController from 'controllers/me-controller'

const router = new Router()

router.get('/me', MeController.show)

export default router.routes()
