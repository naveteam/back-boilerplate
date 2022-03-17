import { NODE_ENV } from 'config'

export const base64Decoder = encoded => {
  if (NODE_ENV === 'local') return encoded
  
  const buffer = new Buffer.from(encoded, 'base64')
  return buffer.toString('utf-8')
}
