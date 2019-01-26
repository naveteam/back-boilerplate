import app from './config/server'
import { PORT } from './config/env'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

export default app
