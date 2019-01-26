import bcrypt from 'bcrypt'

export default password => {
  const hashPassword = bcrypt.hash(password, 10)
  return hashPassword
}
