const { encryptedKode, comparePassword } = require('./auth.js')

describe('#encryptedKode', () => {
  it('should encrypt code', async () => {
    const code = 'muzani123'
    const hashCode = await encryptedKode(code)
    expect(hashCode).toBe(hashCode)
  })
})

describe('#comparePassword', () => {
  it('should compare password', async () => {
    const code = 'muzani123'
    const hashCode = '$2b$10$Y/qKRbi2nxoQIRb9ZEdYMORa3p6VMRGFbi3lhtt4Uw6C2iZJMP1Ka'
    const compareCode = await comparePassword(code, hashCode)
    expect(compareCode).toBeTruthy()
  })
})
