import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { OAuth2 } from '@naveteam/pandora-backend'

import { JWT_SECRET, EXPIRE_TIME } from '../config'

export const generateOAuthToken = dataToEncrypt =>
  OAuth2.generateTokens(dataToEncrypt)

export const generateJWTToken = tokenData =>
  jwt.sign(tokenData, JWT_SECRET, { expiresIn: EXPIRE_TIME })

export const verifyToken = token => jwt.verify(token, JWT_SECRET)
