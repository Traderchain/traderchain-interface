import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import Provider from 'contracts/provider';
import Contract from 'contracts/contract';
import ERC20 from 'contracts/ERC20';
import Traderchain from 'contracts/Traderchain';
import TradingSystem from 'contracts/TradingSystem';
import SystemVault from 'contracts/SystemVault';
import { CHAIN_ID, Address } from 'utils/constants';
import * as Utils from 'utils';

const formatUnits = ethers.utils.formatUnits;

const usdc: Contract = new ERC20(Address.USDC);
const weth: Contract = new ERC20(Address.WETH);
const tc: Contract = new Traderchain(Address.TRADERCHAIN);
const system: Contract = new TradingSystem(Address.TRADING_SYSTEM);

let isListening = false;

export function hasWallet() {
  return Provider.hasWallet();
}

export function useTcContracts() {
  const { isAuthenticated, setAuthenticated } = Utils.useAuth();
  const { showDialog, showError, hideDialog } = Utils.useAlertDialog();
  
  async function checkConnect() {
    if (!Provider.hasWallet()) {
      showError('Please install a Web3 Wallet');
      return false;
    } 
    
    try {
      await Provider.connect();
      setAuthenticated(true);
      registerListeners();
      return await checkChainId();
    }
    catch(err: any) {
      setAuthenticated(false);      
      return false;
    }
  }
    
  async function registerListeners() {
    if (!Provider.hasWallet() || isListening)  return;

    window.ethereum.removeListener('accountsChanged', accountsChanged);
    window.ethereum.on('accountsChanged', accountsChanged);
    
    window.ethereum.removeListener('chainChanged', chainChanged);
    window.ethereum.on('chainChanged', chainChanged);
    
    isListening = true;
  }
  
  function accountsChanged(accounts: string[]) {
    console.log('accountsChanged', accounts);    
    setAuthenticated(accounts.length > 0);
  }
      
  function chainChanged(chainId: string) {
    console.log('chainChanged', chainId);
  }
  
  async function checkChainId() {
    try {
      const chainId = await Provider.getChainId();
      if (chainId == CHAIN_ID)  return true;
      
      await Provider.switchChainId(CHAIN_ID);
      return false;
    }
    catch(err: any) {
      console.log(err);
      return false;
    }
  }    
      
  async function getAccounts() {
    if (!await checkConnect())  throw Error('Wallet is not connected');
    
    return await Provider.getAccounts();
  }

  async function fetchAllSystems() {
    const systemCount = await system.getReadContract().currentSystemId() - 1;

    let systems = [];
    for (let i = 1; i <= systemCount; i++) {
      const systemId = `${i}`;
      systems.push({ systemId });
    }    
    
    return systems;
  }
  
  async function fetchSystems(trader: string) {    
    const systemCount = await system.getReadContract().getTraderSystemsCount(trader);

    let systems = [];
    for (let i = 0; i < systemCount; i++) {
      const sid = await system.getReadContract().getTraderSystemByIndex(trader, i);          
      systems.push({systemId: sid.toString()});
    }
    // systems.sort((a,b) => { return b.systemId - a.systemId; });

    return systems;
  }

  async function fetchSystem(systemId: string) {
    const nav = await tc.getReadContract().currentSystemNAV(systemId);
    const totalShares = await tc.getReadContract().totalSystemShares(systemId);
    const sharePrice = await tc.getReadContract().currentSystemSharePrice(systemId);
    const assetPrice = await tc.getReadContract().getAssetPrice();  
    // console.log({nav: nav.toString(), totalShares: totalShares.toString(), sharePrice: sharePrice.toString(), assetPrice: assetPrice.toString()});
    
    const vault = await system.getReadContract().getSystemVault(systemId);
    const vaultBalance = await usdc.getReadContract().balanceOf(vault);
    const vaultAsset = await weth.getReadContract().balanceOf(vault);
    // console.log({vaultBalance: vaultBalance.toString(), vaultAsset: vaultAsset.toString()});  
    
    const trader = await system.getReadContract().getSystemTrader(systemId);
    
    return { systemId, nav, totalShares, sharePrice, assetPrice, vault, vaultBalance, vaultAsset, trader };
  }

  async function fetchSystemInvestor(systemId: string, investor: string) {
    const shares = await system.getReadContract().balanceOf(investor, systemId);
    // console.log({shares: shares.toString()});
    
    return { systemId, investor, shares };
  }
  
  async function createSystem() {
    if (!await checkConnect())  return;

    try {
      const signer = Provider.getSigner();
      return await tc.getWriteContract().connect(signer).createTradingSystem();  
    }
    catch(err: any) {
      showError(err);
    }
  }  
  
  async function buyShares(systemId: string, amount: BigNumber) {
    if (!await checkConnect())  return;
    
    try {
      const signer = Provider.getSigner();
      await usdc.getWriteContract().connect(signer).approve(tc.getReadContract().address, amount);
      // TODO: listen to approve event
      return await tc.getWriteContract().connect(signer).buyShares(systemId, amount, {gasLimit: '1000000'});        
    }
    catch(err: any) {
      showError(err);
    }
  }
  
  async function sellShares(systemId: string, shares: BigNumber) {    
    if (!await checkConnect())  return;
  
    try {
      const signer = Provider.getSigner();
      return await tc.getWriteContract().connect(signer).sellShares(systemId, shares);    
    }
    catch(err: any) {
      showError(err);
    }
  }
  
  async function placeBuyOrder(systemId: string, amount: BigNumber) {    
    if (!await checkConnect())  return;
    
    try {
      const signer = Provider.getSigner();
      return await tc.getWriteContract().connect(signer).placeBuyOrder(systemId, amount);
    }
    catch(err: any) {
      showError(err);
    }
  }
  
  async function placeSellOrder(systemId: string, amount: BigNumber) {
    if (!await checkConnect())  return;
    
    try {
      const signer = Provider.getSigner();
      return await tc.getWriteContract().connect(signer).placeSellOrder(systemId, amount);
    }
    catch(err: any) {
      showError(err);
    }
  }
  
  return {    
    checkConnect, getAccounts, fetchAllSystems, fetchSystems, fetchSystem, fetchSystemInvestor, 
    createSystem, buyShares, sellShares, placeBuyOrder, placeSellOrder, 
  };
}
