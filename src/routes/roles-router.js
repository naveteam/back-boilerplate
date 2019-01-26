import Router from 'koa-router'
import RolesController from '../controllers/roles-controller'
import RolesValidate from '../schemas/roles-schemas'

const router = new Router()
const ctrl = new RolesController()
const valid = new RolesValidate()

router.get('/roles', ctrl.index)
router.get('/roles/:id', ctrl.show)
router.post('/roles', valid.create(), ctrl.create)
router.put('/roles/:id', valid.update(), ctrl.update)
router.delete('/roles/:id', ctrl.destroy)

export default router.routes()
