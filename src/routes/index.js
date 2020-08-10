import Router from 'koa-router'

import users from './users-router'

const router = new Router()
const api = new Router()

api.use(users)

router.use('/v1', api.routes())

export default router
