export function startupSettings(): void {
  const jwtPrivateKey = process.env.JWT_PRIVATE_KEY
  if (!jwtPrivateKey) {
    throw new Error('JWT Private Key not defined!')
  }
}
