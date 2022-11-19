import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import Provider from 'contracts/provider';
import ERC20 from 'contracts/ERC20';
import Traderchain from 'contracts/Traderchain';
import TradingSystem from 'contracts/TradingSystem';
import SystemVault from 'contracts/SystemVault';
import { Address } from 'utils/constants';
import * as Utils from 'utils';

const formatUnits = ethers.utils.formatUnits;

const usdc: Contract = new ERC20(Address.USDC).getContract();
const weth: Contract = new ERC20(Address.WETH).getContract();
const tc: Contract = new Traderchain(Address.TRADERCHAIN).getContract();
const system: Contract = new TradingSystem(Address.TRADING_SYSTEM).getContract();

export function useTcContracts() {
  const { isAuthenticated, setAuthenticated } = Utils.useAuth();
  
  async function connect() {
    const accounts = await Provider.connect();
    setAuthenticated(true);
    return accounts;
  }

  async function checkConnect() {
    if (isAuthenticated)  return true;
    
    await connect();
    return false;
  }
      
  async function getAccounts() {
    if (!isAuthenticated)  return [];
    
    return await Provider.getAccounts();
  }

  async function fetchSystems(trader: string) {    
    if (!isAuthenticated)  return [];
    
    const systemCount = await system.getTraderSystemsCount(trader);

    let newSystems = [];
    for (let i = 0; i < systemCount; i++) {
      const sid = await system.getTraderSystemByIndex(trader, i);          
      newSystems.push({systemId: sid.toString()});
    }
    // newSystems.sort((a,b) => { return b.systemId - a.systemId; });

    return newSystems;
  }

  async function fetchSystem(systemId: string) {
    if (!isAuthenticated)  return { systemId };
    
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

  async function fetchSystemInvestor(systemId: string, investor: string) {
    if (!isAuthenticated)  return { systemId, investor };
    
    const shares = await system.balanceOf(investor, systemId);
    // console.log({shares: shares.toString()});
    
    return { systemId, investor, shares };
  }
  
  async function createSystem() {
    if (!await checkConnect())  return;

    const signer = Provider.getSigner();
    return await tc.connect(signer).createTradingSystem();
  }  
  
  async function buyShares(systemId: string, amount: BigNumber) {
    const signer = Provider.getSigner();
    await usdc.connect(signer).approve(tc.address, amount);
    // TODO: listen to approve event
    return await tc.connect(signer).buyShares(systemId, amount, {gasLimit: '1000000'});        
  }
  
  async function sellShares(systemId: string, shares: BigNumber) {    
    const signer = Provider.getSigner();
    return await tc.connect(signer).sellShares(systemId, shares);    
  }
  
  async function placeBuyOrder(systemId: string, amount: BigNumber) {    
    const signer = Provider.getSigner();
    return await tc.connect(signer).placeBuyOrder(systemId, amount);
  }
  
  async function placeSellOrder(systemId: string, amount: BigNumber) {
    const signer = Provider.getSigner();
    return await tc.connect(signer).placeSellOrder(systemId, amount);
  }
  
  return {    
    connect, getAccounts, fetchSystem, fetchSystems, fetchSystemInvestor, 
    createSystem, buyShares, sellShares, placeBuyOrder, placeSellOrder, 
  };
}
