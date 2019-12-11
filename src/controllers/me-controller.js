import User from 'models/User'

const MeController = {
  show: ctx => new User({ id: ctx.state.user.id }).fetch()
}

export default MeController
