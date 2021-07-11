import Koa from 'koa'
import Queue from 'bull'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { KoaAdapter } from '@bull-board/koa'

import { QUEUE_PORT } from 'config'

const someQueue = new Queue('someQueue')

const serverAdapter = new KoaAdapter()

createBullBoard({
  queues: [new BullAdapter(someQueue)],
  serverAdapter: serverAdapter
})

const app = new Koa()

serverAdapter.setBasePath('/v1/queues/dashboard')
app.use(serverAdapter.registerPlugin())

app.listen(QUEUE_PORT, () =>
  console.log(`Queue is running on port ${QUEUE_PORT}`)
)
