// import { useEffect } from 'react';
import Button from "@mui/material/Button";
import { VuiButton } from 'traderchain-ui';
import { isDevelopmentEnv, isProductionEnv } from 'utils';
import { ServerStatus, Address } from 'utils/constants';

import Provider from 'contracts/provider';
import ERC20 from 'contracts/ERC20';
import Traderchain from 'contracts/Traderchain';
import TradingSystem from 'contracts/TradingSystem';
import SystemVault from 'contracts/SystemVault';
import { ethers } from 'ethers';
const formatUnits = ethers.utils.formatUnits;

async function test() {
  const provider = Provider.getProvider();
  const accounts = await Provider.getAccounts();
  console.log({accounts});
  
  const usdc = new ERC20(Address.USDC).getContract();  
  const weth = new ERC20(Address.WETH).getContract();  
  
  const balance = await usdc.balanceOf(Address.TEST_ACCOUNT1);
  console.log({balance: formatUnits(balance, 6)});
  
  // const tx = await Provider.sendTransaction(mm2, '0.01');
  // console.log(tx);    
    
  // const usdcAmount = ethers.utils.parseUnits('0.01', 6);  
  // const tx = await usdc.transfer(mm2, usdcAmount);
  // console.log(tx);  
  
  const tc = new Traderchain(Address.TRADERCHAIN).getContract();
  const system = new TradingSystem(Address.TRADING_SYSTEM).getContract();  
  
  const systemId = 1;
  // const systemId = await system.currentSystemId();
  console.log({systemId: systemId.toString()});
  
  // let tx = await tc.createTradingSystem(); 
  // console.log('tc.createTradingSystem() tx:', tx);
  
  const vault = await system.getSystemVault(systemId);
  console.log({vault});  
  
  const usdcAmount = ethers.utils.parseUnits('100', 6);
  // await usdc.approve(tc.address, usdcAmount);
  // await tc.buyShares(systemId, usdcAmount, {gasLimit: '1000000'});    
  
  const vaultBalance = await usdc.balanceOf(vault);
  const vaultAsset = await weth.balanceOf(vault);
  console.log({vaultBalance: vaultBalance.toString(), vaultAsset: vaultAsset.toString()});  
  
  const investorShares = await system.balanceOf(Address.TEST_ACCOUNT1, systemId);
  console.log({investorShares: investorShares.toString()});
  
  let nav = await tc.currentSystemNAV(systemId);
  let sharePrice = await tc.currentSystemSharePrice(systemId);
  let assetPrice = await tc.getAssetPrice();
  console.log({nav: nav.toString(), sharePrice: sharePrice.toString(), assetPrice: assetPrice.toString()});
  
  // const amountIn = ethers.utils.parseUnits('50', 6);
  // await tc.placeOrder(systemId, Address.USDC, Address.WETH, amountIn);
  
  // const numberOfShares = investorShares.div(ethers.BigNumber.from(2));
  // await tc.sellShares(systemId, numberOfShares);
}
// test();

export default function Experiment() {
  
  // useEffect(() => {
  //   console.log('useEffect');
  // }, []);

  return (
    <div>
      <h2>Experiment</h2>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>REACT_APP_DOMAIN: {process.env.REACT_APP_DOMAIN}</p>
      <p>isDevelopmentEnv: {isDevelopmentEnv() ? 'true' : 'false'}</p>
      <p>isProductionEnv: {isProductionEnv() ? 'true' : 'false'}</p>
      <p>ServerStatus.SUCCESS: {ServerStatus.SUCCESS}</p>
      <p>ServerStatus.FAILURE: {ServerStatus.FAILURE}</p>      
      <p><Button variant="outlined">Button</Button></p>      
      <p><VuiButton variant="outlined" color="light">VuiButton</VuiButton></p>      
    </div>
  );
}
