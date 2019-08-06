import User from '../models/User'

const MeController = {
  show: async ctx =>
    (ctx.body = await new User({
      id: ctx.state.user.sub.id
    }).fetch({ withRelated: ['role'], require: true }))
}

export default MeController
