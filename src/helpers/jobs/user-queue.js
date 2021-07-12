import User from 'models/User'

import { encryptPassword } from 'helpers'

export const userJob = async ({ data }, done) => {
  try {
    await User.query().insert({
      name: data.name,
      password: await encryptPassword(data.password),
      email: data.email,
      role_id: data.role_id,
      birthdate: data.birthdate
    })

    done()
  } catch (error) {
    done(new Error(error))
  }
}
