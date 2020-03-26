import User from 'models/User'
import {
  stringGenerator,
  emailGenerator,
  generateJWTToken,
  encryptPassword
} from 'helpers'

const userFactory = async () => {
  const password = 'test123'

  const user = await new User({
    name: stringGenerator(),
    email: emailGenerator(),
    password: await encryptPassword(password),
    role: 1
  }).save()

  return {
    ...user.attributes,
    password,
    token: `Bearer ${generateJWTToken(user.attributes)}`
  }
}

export default userFactory
