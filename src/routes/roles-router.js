import Router from 'koa-router'

import rolesController from 'controllers/roles-controller'

const router = new Router()

router.get('/roles', rolesController.index)

export default router.routes()
