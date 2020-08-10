import User from 'models/User'

import {
  stringGenerator,
  emailGenerator,
  generateJWTToken,
  encryptPassword
} from 'helpers'

const userFactory = async () => {
  const password = 'test123'

  const user = await User.query().insert({
    name: stringGenerator(),
    email: emailGenerator(),
    password: await encryptPassword(password),
    role_id: 1
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
