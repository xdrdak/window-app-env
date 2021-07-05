type NodeEnvType = 'development' | 'test' | 'production' | 'staging';
type ShortNodeEnvType = 'dev' | 'test' | 'prd' | 'stg';
type EnvironmentVariableConfig = Partial<Record<ShortNodeEnvType, string>>;
type Config = Record<string, EnvironmentVariableConfig>;

const SHORT_ENV_NAMES = {
  production: 'prd',
  staging: 'stg',
  test: 'test',
  development: 'dev',
} as Record<NodeEnvType, ShortNodeEnvType>;

/**
 * @param config Configuration object for environment variables. It's a nested object of the following
 * shape:
 * {
 *  ENV_VAR_NAME: {
 *    prd: 'some-prd-value',
 *    stg: 'some-stg-value',
 *    dev: 'some-dev-value',
 *  },
 * }
 */
function createConfig(config: Config) {
  const env = ((window && (window as any).APP_ENVIRONMENT) || 'development') as NodeEnvType;
  const entries = Object.entries(config);
  const nextConfig: Record<keyof Config, string> = {};
  const target = SHORT_ENV_NAMES[env] || SHORT_ENV_NAMES.development;

  for (const [key, values] of entries) {
    const value = values[target];
    if (value) {
      nextConfig[key] = value;
    }
  }

  return { config: nextConfig, env };
}

export { createConfig };