import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { JWT_SECRET, EXPIRE_TIME } from '../config'

export const generateJWTToken = tokenData =>
  jwt.sign(tokenData, JWT_SECRET, { expiresIn: EXPIRE_TIME })

export const encryptPassword = (password, length = 10) =>
  bcrypt.hash(password, length)
