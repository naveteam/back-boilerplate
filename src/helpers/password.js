import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { JWT_SECRET } from '../config'

export const generateJWTToken = ({ id, role }) =>
  jwt.sign({ id, role }, JWT_SECRET)

export const encryptPassword = (password, length = 10) =>
  bcrypt.hash(password, length)
