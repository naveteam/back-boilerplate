import 'babel-polyfill'
import app from 'server'
import { PORT } from 'config'
import process from 'process'

process.on('SIGINT', function onSigint() {
  app.shutdown()
})

process.on('SIGTERM', function onSigterm() {
  app.shutdown()
})

app.shutdown = function () {
  process.exit()
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default app
