import Koa from 'koa'
import { createBullBoard } from '@bull-board/api'
import { KoaAdapter } from '@bull-board/koa'

import { QUEUE_PORT } from 'config'

import { userQueue } from 'helpers'

const serverAdapter = new KoaAdapter()

createBullBoard({
  queues: [userQueue.adapter],
  serverAdapter
})

const app = new Koa()

serverAdapter.setBasePath('/v1/queues/dashboard')
app.use(serverAdapter.registerPlugin())

app.listen(QUEUE_PORT, () =>
  console.log(`Queue is running on port ${QUEUE_PORT}`)
)
