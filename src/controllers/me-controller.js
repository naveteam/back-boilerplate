import User from '../../database/models/User'
import { NotFound } from '../utils'

class Controller {
  async show (ctx) {
    const user = await new User({ id: ctx.state.user.sub.id })
      .fetch({ withRelated: ['role'], require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = user
  }
}

export default Controller
