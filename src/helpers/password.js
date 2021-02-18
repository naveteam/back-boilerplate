import bcrypt from 'bcryptjs'

export const encryptPassword = (password, length = 10) =>
  bcrypt.hash(password, length)
