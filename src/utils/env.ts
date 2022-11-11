export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === 'test';
}

export function isProductionEnv(): boolean {
  return process.env.NODE_ENV === 'production';
}
