import { isDevelopmentEnv, isTestEnv, isProductionEnv } from 'utils/env'

describe('env', () => {
  const ENV = process.env
  afterEach(() => {
    process.env = ENV
  })

  function setEnv(env: Record<string, unknown>) {
    process.env = {      
      PUBLIC_URL: 'http://example.com',
      NODE_ENV: 'development',
      ...env,
    }
  }

  it('isDevelopmentEnv', () => {
    setEnv({ NODE_ENV: 'development' })
    expect(isDevelopmentEnv()).toBe(true)
  })

  it('isTestEnv', () => {
    setEnv({ NODE_ENV: 'test' })
    expect(isTestEnv()).toBe(true)
  })  

  it('isProductionEnv', () => {
    setEnv({ NODE_ENV: 'production' })
    expect(isProductionEnv()).toBe(true)
  })
  
})
