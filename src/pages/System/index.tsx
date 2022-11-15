import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import * as TC from 'utils/tc';

export default function System() {
  const { systemId } = useParams<{ systemId?: string }>();
  const [system, setSystem] = useState<any>({ systemId });
  const [systemInvestor, setSystemInvestor] = useState<any>({ systemId });
  
  useEffect(() => {
    async function init() {      
      setSystem(await TC.fetchSystem(systemId!));
      await fetchSystemInvestor();
    }
    init();
  }, []);
    
  async function fetchSystemInvestor() {    
    const accounts = await TC.getAccounts();
    const investor = accounts[0];    
    setSystemInvestor(await TC.fetchSystemInvestor(systemId!, investor));
  }
  
  async function buyShares() {
    const usdcAmount = ethers.utils.parseUnits('100', 6);
    await TC.usdc.approve(TC.tc.address, usdcAmount);
    // TODO: listen to approve event
    const tx = await TC.tc.buyShares(systemId, usdcAmount, {gasLimit: '1000000'});    
    console.log(tx);
  }
  
  async function sellShares() {
    if (!systemInvestor.shares)  return;
    
    const numberOfShares = systemInvestor.shares.div(ethers.BigNumber.from(2));
    const tx = await TC.tc.sellShares(systemId, numberOfShares);    
    console.log(tx);
  }

  return (
    <div id="system">
      <VuiButton variant="contained" color="info" onClick={buyShares} sx={{margin: "10px"}}>
        Buy Shares
      </VuiButton>
      <VuiButton variant="contained" color="error" onClick={sellShares} sx={{margin: "10px"}}>
        Sell Shares
      </VuiButton>
      <Divider />
      <Section        
        title = {`Trading System #${system.systemId}`}
        body = {
          <VuiBox>
            <VuiTypography color="text">System description...</VuiTypography>
            <Divider />
            
            <VuiTypography color="text">
              <b>System Stats</b><br/>
              NAV: {system.nav && system.nav.toString()}<br/>
              Total Shares: {system.totalShares && system.totalShares.toString()}<br/>
              Share Price: {system.sharePrice && system.sharePrice.toString()}<br/>
              Asset Price: {system.assetPrice && system.assetPrice.toString()}<br/>
              Vault Balance: {system.vaultBalance && system.vaultBalance.toString()}<br/>
              Vault Asset: {system.vaultAsset && system.vaultAsset.toString()}<br/>
            </VuiTypography>
            <Divider />
            
            <VuiTypography color="text">
              <b>System Investor Stats</b><br/>
              Shares: {systemInvestor.shares && systemInvestor.shares.toString()}<br/>
              Value: {systemInvestor.shares && system.sharePrice && (systemInvestor.shares.mul(system.sharePrice)).toString()}<br/>
            </VuiTypography>
          </VuiBox>
        }
      />
      
    </div>
  );
}
