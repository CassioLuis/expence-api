import crypto from 'crypto'

export default function toBase64 (password: string): string {
  return Buffer.from(crypto.createHash('md5').update(password).digest('hex'), 'hex').toString('base64')
}
