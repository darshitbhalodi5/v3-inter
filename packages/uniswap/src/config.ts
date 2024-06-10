import { isNonJestDev } from 'utilities/src/environment'

export interface Config {
  appsflyerApiKey: string
  appsflyerAppId: string
  fiatOnRampApiUrl: string
  moonpayApiKey: string
  moonpayApiUrl: string
  moonpayWidgetApiUrl: string
  uniswapApiBaseUrl: string
  uniswapApiKey: string
  uniswapAppUrl: string
  infuraProjectId: string
  onesignalAppId: string
  sentryDsn: string
  simpleHashApiKey: string
  simpleHashApiUrl: string
  statSigProxyUrl: string
  walletConnectProjectId: string
  quicknodeBnbRpcUrl: string
  unitagsApiUrl: string
  tradingApiKey: string
  tradingApiUrl: string
  firebaseAppCheckDebugToken: string
}

const _config: Config = {
  appsflyerApiKey: 'key',
  appsflyerAppId: "123",
  fiatOnRampApiUrl: 'https://api.uniswap.org',
  moonpayApiKey: 'key',
  moonpayApiUrl: 'https://api.moonpay.com',
  moonpayWidgetApiUrl: 'https://api.moonpay.com',
  uniswapApiBaseUrl: 'https://api.uniswap.org',
  uniswapApiKey: 'key',
  uniswapAppUrl: 'https://app.uniswap.org',
  infuraProjectId: "123",
  onesignalAppId: "123",
  sentryDsn: 'http://sentry.com',
  simpleHashApiKey: 'key',
  simpleHashApiUrl: 'https://api.simplehash.com',
  statSigProxyUrl: 'https://api.statsig.com',
  walletConnectProjectId: "123",
  quicknodeBnbRpcUrl: 'https://api.uniswap.org',
  unitagsApiUrl: 'https://api.uniswap.org/unitags',
  tradingApiKey: 'key',
  tradingApiUrl: 'https://api.uniswap.org',
  firebaseAppCheckDebugToken: 'token',
}

export const config = Object.freeze(_config)

if (isNonJestDev) {
  // Cannot use logger here, causes error from circular dep
  // eslint-disable-next-line no-console
  console.debug('Using app config:', config)
}