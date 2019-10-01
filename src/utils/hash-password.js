import bcrypt from 'bcryptjs'

export default password => {
  const hashPassword = bcrypt.hash(password, 10)
  return hashPassword
}
