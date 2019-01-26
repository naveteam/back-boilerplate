import Router from 'koa-router'
import MeController from '../controllers/me-controller'

const router = new Router()
const ctrl = new MeController()

router.get('/me', ctrl.show)

export default router.routes()
