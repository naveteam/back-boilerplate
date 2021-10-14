export const base64Decoder = encoded => {
  const buffer = new Buffer.from(encoded, 'base64')
  return buffer.toString('utf-8')
}
