import crypto from 'node:crypto';

export default function generateShortCode(length = 6): string {
  return crypto.randomBytes(8).toString('base64url').slice(0, length);
}
