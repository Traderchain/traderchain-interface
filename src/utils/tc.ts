import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts'
import Provider from 'contracts/provider';
import ERC20 from 'contracts/ERC20';
import Traderchain from 'contracts/Traderchain';
import TradingSystem from 'contracts/TradingSystem';
// import SystemVault from 'contracts/SystemVault';
import { Address } from 'utils/constants';

const formatUnits = ethers.utils.formatUnits;

export const usdc: Contract = new ERC20(Address.USDC).getContract();
export const weth: Contract = new ERC20(Address.WETH).getContract();
export const tc: Contract = new Traderchain(Address.TRADERCHAIN).getContract();
export const system: Contract = new TradingSystem(Address.TRADING_SYSTEM).getContract();
    
export async function getAccounts() {
  return await Provider.getAccounts();
}

export async function fetchSystems(trader: string) {    
  const systemCount = await system.getTraderSystemsCount(trader);

  let newSystems = [];
  for (let i = 0; i < systemCount; i++) {
    const sid = await system.getTraderSystemByIndex(trader, i);          
    newSystems.push({systemId: sid.toString()});
  }
  newSystems.sort((a,b) => { return b.systemId - a.systemId; });

  return newSystems;
}
