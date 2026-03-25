function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required environment variable: ${key}`)
  return value
}

export const env = {
  API_BASE_URL: requireEnv("NEXT_PUBLIC_API_BASE_URL"),
  API_BYPASS_TOKEN: requireEnv("API_BYPASS_TOKEN"),
  PUBLIC_APP_URL: requireEnv("NEXT_PUBLIC_APP_URL"),
}
