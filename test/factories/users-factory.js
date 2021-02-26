import User from 'models/User'
import chance from 'chance'

import { generateJWTToken, encryptPassword } from 'helpers'

const userFactory = async () => {
  const password = 'test123'
  const user = await User.query().insert({
    name: chance().name(),
    email: chance().email(),
    password: await encryptPassword(password),
    role_id: 1,
    birthdate: chance().date()
  })

  const parsedUser = user.toJSON()
  return {
    ...parsedUser,
    password,
    token: `Bearer ${generateJWTToken({
      id: parsedUser.id,
      role_id: parsedUser.role_id
    })}`
  }
}

export default userFactory
