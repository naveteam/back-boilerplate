import User from '../../database/models/User'
import RoleFactory from './role-factory'
import {
  hashPassword,
  generateJWT,
  stringGenerator,
  emailGenerator
} from '../../src/utils'

export default async () => {
  const password = 'test123'

  const role = await RoleFactory()

  let user = await new User({
    name: stringGenerator(),
    email: emailGenerator(),
    password: await hashPassword(password),
    role_id: role.id
  }).save()

  const userWithRole = await new User({ id: user.attributes.id })
    .fetch({ withRelated: ['role'] })

  user = generateJWT(userWithRole.toJSON())
  user.password = password
  user.token = `Bearer ${user.token}`
  return user
}
