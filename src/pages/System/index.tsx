import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import { useAuth } from 'utils';
import { useTcContracts } from 'utils/tc';
import { Address } from 'utils/constants';

export default function System() {
  const { systemId } = useParams<{ systemId?: string }>();
  const [system, setSystem] = useState<any>({ systemId });
  const [systemInvestor, setSystemInvestor] = useState<any>({ systemId });
  const [isTrader, setIsTrader] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { usdc, weth, tc, getAccounts, fetchSystem, fetchSystems, fetchSystemInvestor } = useTcContracts();
  
  useEffect(() => {
    async function init() {      
      await loadSystem();
      await loadSystemInvestor();
    }
    init();
  }, [isAuthenticated]);

  async function loadSystem() {
    const accounts = await getAccounts();
    const trader = accounts[0];    
    const _system = await fetchSystem(systemId!);
    setSystem(_system);    
    setIsTrader(_system.trader && trader && _system.trader.toLowerCase() == trader.toLowerCase());
  }
    
  async function loadSystemInvestor() {    
    const accounts = await getAccounts();
    const investor = accounts[0];    
    setSystemInvestor(await fetchSystemInvestor(systemId!, investor));
  }
  
  async function buyShares() {
    const usdcAmount = ethers.utils.parseUnits('100', 6);
    await usdc.approve(tc.address, usdcAmount);
    // TODO: listen to approve event
    const tx = await tc.buyShares(systemId, usdcAmount, {gasLimit: '1000000'});    
    console.log(tx);
  }
  
  async function sellShares() {
    if (!systemInvestor.shares)  return;
    
    const numberOfShares = systemInvestor.shares.div(ethers.BigNumber.from(2));
    const tx = await tc.sellShares(systemId, numberOfShares);    
    console.log(tx);
  }

  async function placeBuyOrder() {
    const usdcAmount = ethers.utils.parseUnits('50', 6);
    await tc.placeBuyOrder(systemId, usdcAmount);
  }
  
  async function placeSellOrder() {
    const wethAmount = ethers.utils.parseUnits('0.01', 18);
    await tc.placeSellOrder(systemId, wethAmount);
  }

  return (
    <div id="system">
      <VuiBox>
        <VuiButton variant="contained" color="info" onClick={buyShares} sx={{margin: "10px"}}>
          BUY SHARES
        </VuiButton>
        <VuiButton variant="contained" color="error" onClick={sellShares} sx={{margin: "10px"}}>
          SELL SHARES
        </VuiButton>
      </VuiBox>
      <Divider />
      
      {isTrader && 
      <VuiBox>
        <VuiButton variant="contained" color="info" onClick={placeBuyOrder} sx={{margin: "10px"}}>
          PLACE BUY ORDER
        </VuiButton>
        <VuiButton variant="contained" color="error" onClick={placeSellOrder} sx={{margin: "10px"}}>
          PLACE SELL ORDER
        </VuiButton>
      </VuiBox>}
      <Divider />
      
      <Section        
        title = {`Fund ${system.systemId}`}
        body = {
          <VuiBox>
            <VuiTypography color="text">Fund description...</VuiTypography>
            <Divider />
            
            <VuiTypography color="text">
              <b>Fund Stats</b><br/>
              NAV: {system.nav && system.nav.toString()}<br/>
              Total Shares: {system.totalShares && system.totalShares.toString()}<br/>
              Share Price: {system.sharePrice && system.sharePrice.toString()}<br/>
              Asset Price: {system.assetPrice && system.assetPrice.toString()}<br/>
              Vault Balance: {system.vaultBalance && system.vaultBalance.toString()}<br/>
              Vault Asset: {system.vaultAsset && system.vaultAsset.toString()}<br/>
              Trader: {system.trader && system.trader}<br/>
            </VuiTypography>
            <Divider />
            
            <VuiTypography color="text">
              <b>Your Investment</b><br/>
              Investor: {systemInvestor.investor && systemInvestor.investor}<br/>
              Shares: {systemInvestor.shares && systemInvestor.shares.toString()}<br/>
              Value: {systemInvestor.shares && system.sharePrice && (systemInvestor.shares.mul(system.sharePrice)).toString()}<br/>
            </VuiTypography>
          </VuiBox>
        }
      />
      
    </div>
  );
}
