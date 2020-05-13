import Router from 'koa-router'

import RoleController from 'controllers/roles-controller'
import RolesValidate from 'validators/roles-schema'

const router = new Router()

router.get('/roles', RoleController.index)
router.get('/roles/:id', RoleController.show)

router.post('/roles/create', RolesValidate.create(), RoleController.create)

router.put('/roles/:id', RolesValidate.update(), RoleController.update)

router.delete('/roles/:id', RoleController.destroy)

export default router.routes()
