import { createQueue } from './queue-config'

import { userJob } from 'helpers'

export const userQueue = createQueue({ label: 'create user' })

userQueue.queue.process((job, done) => userJob(job, done))
