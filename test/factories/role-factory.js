import Role from 'models/Role'

const roleFactory = () =>
  Role.query().insert({
    role: 'admin'
  })

export default roleFactory
