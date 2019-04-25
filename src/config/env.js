import dotenv from 'dotenv'

dotenv.config({path: process.env.PATH_ENV})

export const JWT_SECRET = process.env.SECRET || 'mysupersecret'
export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV
export const DATABASE = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/boilerplate'
