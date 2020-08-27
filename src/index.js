import app from 'server'
import process from 'process'
import logger from 'logger'

import { PORT } from 'config'

app.shutdown = () => process.exit()

process.on('SIGINT', () => app.shutdown())

process.on('SIGTERM', () => app.shutdown())

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))

export default app
