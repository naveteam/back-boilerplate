import Role from 'models/Role'
import { stringGenerator } from 'helpers'

const roleFactory = async () => {
  const role = await new Role({
    role: stringGenerator()
  }).save()

  return role
}

export default roleFactory
