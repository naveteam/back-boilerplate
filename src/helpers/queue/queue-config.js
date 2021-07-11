import Queue from 'bull'

import { redisConfig } from 'helpers'

export const createQueue = ({ label }) => new Queue(label, redisConfig)
