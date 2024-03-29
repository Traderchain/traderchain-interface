import { isProductionEnv } from 'utils/env';

export const CHAIN_ID = isProductionEnv() ? '0x5' : '0x7a69';
export const CHAIN_NAME = {
  '0x5': 'Goerli',
  '0x7a69': 'Hardhat',
}[CHAIN_ID];

enum AddressDev {  
  USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',  
  
  SWAP_ROUTER = '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  SWAP_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984',  
  SWAP_POOL_WETH_USDC = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8',
  
  TRADERCHAIN = '0x3f9A1B67F3a3548e0ea5c9eaf43A402d12b6a273',
  TRADING_SYSTEM = '0xFD6D23eE2b6b136E34572fc80cbCd33E9787705e',
}

enum AddressGoerli {  
  USDC = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',  
  
  SWAP_ROUTER = '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  SWAP_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  SWAP_POOL_WETH_USDC = '0x6337B3caf9C5236c7f3D1694410776119eDaF9FA',
  
  TRADERCHAIN = '0xb8777A088E59AC0BA910F7502A39DED523e6DBbf',
  TRADING_SYSTEM = '0x664E2b9933f1E29e1081f02e4957A9523e29851e',  
}

export const Address = isProductionEnv() ? AddressGoerli : AddressDev;

export enum Page {
  ANY = '',
  HOME = 'home',
  INVEST = 'invest',
  TRADE = 'trade',
}

export enum Outlink {
  TRADERCHAIN_TWITTER = 'https://twitter.com/TraderchainDAO',
  TRADERCHAIN_GITHUB = 'https://github.com/Traderchain',
  TRADERCHAIN_WHITEPAPER = 'https://traderchain.org/traderchain.pdf',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const CC_FSYMS: any = {'eosusd': 'EOS', 'ltcusd': 'LTC', 'xrpusd': 'XRP', 'ethusd': 'ETH', 'etcusd': 'ETC', 'xlmusd': 'XLM', 'dashusd': 'DASH', 'batusd': 'BAT', 'trxusd': 'TRX', 'neousd': 'NEO', 'adausd': 'ADA', 'zecusd': 'ZEC', 'xmrusd': 'XMR', 'iotusd': 'MIOTA', 'omgusd': 'OMG', 'icxusd': 'ICX', 'xtzusd': 'XTZ', 'linkusd': 'LINK', 'zrxusd': 'ZRX', 'atomusd': 'ATOM', 'mkrusd': 'MKR', 'manausd': 'MANA', 'uniusd': 'UNI', 'aaveusd': 'AAVE', 'compusd': 'COMP', 'filusd': 'FIL', 'bnbusd': 'BNB', 'solusd': 'SOL', 'maticusd': 'MATIC', 'dogeusd': 'DOGE', 'sandusd': 'SAND'};
