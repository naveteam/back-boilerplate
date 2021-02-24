import Router from 'koa-router'

import users from './users-router'
import roles from './roles-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(roles)

router.use('/v1', api.routes())

export default router
