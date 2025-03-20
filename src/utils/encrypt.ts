const key = process.env.ENCRYPTION_KEY
const iv = process.env.ENCRYPTION_IV

import * as crypto from 'crypto'

//@ts-ignore
const key_buffer = Buffer.from(key, 'hex')

//@ts-ignore
const iv_buffer = Buffer.from(iv, 'hex')

const algorithm = 'aes-256-cbc'

export function encrypt (payload: string) {
  const cipher = crypto.createCipheriv(algorithm, key_buffer, iv_buffer)

  let encrypted = cipher.update(payload, 'utf-8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

export function decrypt (payload: string) {
  const decipher = crypto.createDecipheriv(algorithm, key_buffer, iv_buffer)
  let decrypted = decipher.update(payload, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}
