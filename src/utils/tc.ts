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

export async function fetchSystem(systemId: string) {
  const nav = await tc.currentSystemNAV(systemId);
  const totalShares = await tc.totalSystemShares(systemId);
  const sharePrice = await tc.currentSystemSharePrice(systemId);
  const assetPrice = await tc.getAssetPrice();  
  // console.log({nav: nav.toString(), totalShares: totalShares.toString(), sharePrice: sharePrice.toString(), assetPrice: assetPrice.toString()});
  
  const vault = await system.getSystemVault(systemId);
  const vaultBalance = await usdc.balanceOf(vault);
  const vaultAsset = await weth.balanceOf(vault);
  // console.log({vaultBalance: vaultBalance.toString(), vaultAsset: vaultAsset.toString()});  
  
  const trader = await system.getSystemTrader(systemId);
  
  return { systemId, nav, totalShares, sharePrice, assetPrice, vault, vaultBalance, vaultAsset, trader };
}

export async function fetchSystemInvestor(systemId: string, investor: string) {
  const shares = await system.balanceOf(investor, systemId);
  // console.log({shares: shares.toString()});
  
  return { systemId, investor, shares };
}
