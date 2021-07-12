import Queue from 'bull'
import { BullAdapter } from '@bull-board/api/bullAdapter'

import { redisConfig } from 'helpers'

export const createQueue = ({ label }) => {
  const queue = new Queue(label, redisConfig)

  return {
    queue,
    adapter: new BullAdapter(queue)
  }
}
