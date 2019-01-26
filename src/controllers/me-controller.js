import User from '../../database/models/User'
import { NotFound } from '../utils'

class Controller {
  async show (ctx) {
    const user = await new User({ id: ctx.state.user.sub.id })
      .fetch({ withRelated: ['role'] })
      .catch(err => { throw new NotFound(err.toString()) })

    if (!user) {
      throw new NotFound()
    }

    ctx.body = user
  }
}

export default Controller
