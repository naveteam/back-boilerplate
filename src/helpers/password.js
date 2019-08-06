import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { JWT_SECRET } from '../config/env'

export const generateJWTToken = ({ id, username, role_id }) =>
  jwt.sign({ sub: { id, username, role_id } }, JWT_SECRET)

export const encryptPassword = (password, length = 10) =>
  bcrypt.hash(password, length)
