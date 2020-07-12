import Role from 'models/Role'

const roleFactory = async () => {
  return Role.query().insert({
    id: 1,
    role: 'admin'
  })
}

export default roleFactory
