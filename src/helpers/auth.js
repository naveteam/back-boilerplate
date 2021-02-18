import jwt from 'jsonwebtoken'
import { OAuth2 } from '@naveteam/pandora-backend'

import { ACCESS_SECRET, EXPIRE_TIME } from '../config'

export const generateTokens = dataToEncrypt =>
  OAuth2.generateTokens(dataToEncrypt)

export const refreshOAuthToken = body => OAuth2.refreshAccessToken(body)

export const generateJWTToken = tokenData =>
  jwt.sign(tokenData, ACCESS_SECRET, { expiresIn: EXPIRE_TIME })

export const verifyToken = token => jwt.verify(token, ACCESS_SECRET)
