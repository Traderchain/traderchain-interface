import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Grid, Card, Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import { useAuth } from 'utils';
import { useTcContracts } from 'utils/tc';
import { Address } from 'utils/constants';
import Section from 'components/Section';
import NAV from './components/NAV';
import Portfolio from './components/Portfolio';
import FundStats from './components/FundStats';
import InvestorStats from './components/InvestorStats';

export default function System() {
  const { systemId } = useParams<{ systemId?: string }>();
  const [account, setAccount] = useState<string>('');
  const [system, setSystem] = useState<any>({ systemId });
  const [systemInvestor, setSystemInvestor] = useState<any>({ systemId });
  const [isTrader, setIsTrader] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { getAccounts, fetchSystem, fetchSystems, fetchSystemInvestor, buyShares, sellShares, placeBuyOrder, placeSellOrder } = useTcContracts();
  
  useEffect(() => {
    async function init() {
      await loadSystem();
      await loadAccount();      
    }
    init();
  }, [isAuthenticated]);
  
  useEffect(() => {
    if (account)  loadSystemInvestor();
  }, [account]);
  
  useEffect(() => {
    if (account && system.trader)  setIsTrader(system.trader && system.trader.toLowerCase() == account.toLowerCase());
  }, [account, system]);

  async function loadAccount() {
    try {
      const accounts = await getAccounts();
      setAccount(accounts[0]);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  async function loadSystem() {    
    const _system = await fetchSystem(systemId!);
    setSystem(_system);        
  }
    
  async function loadSystemInvestor() {    
    if (!account)  return;
    
    setSystemInvestor(await fetchSystemInvestor(systemId!, account));    
  }
  
  async function buySystemShares() {
    const usdcAmount = ethers.utils.parseUnits('10', 6);
    const tx = await buyShares(systemId!, usdcAmount);
    console.log(tx);
  }
  
  async function sellSystemShares() {
    if (!systemInvestor.shares)  return;
    
    const numberOfShares = systemInvestor.shares.div(ethers.BigNumber.from(2));
    const tx = await sellShares(systemId!, numberOfShares);    
    console.log(tx);
  }

  async function submitBuyOrder() {
    const usdcAmount = ethers.utils.parseUnits('10', 6);
    const tx = await placeBuyOrder(systemId!, usdcAmount);    
    console.log(tx);
  }
  
  async function submitSellOrder() {
    const wethAmount = ethers.utils.parseUnits('0.00007', 18);
    const tx = await placeSellOrder(systemId!, wethAmount);
    console.log(tx);
  }

  const fundStatsColumns = [
    { name: "property" },
    { name: "value" },
  ];

  const fundStatsRows = [
    { property: "Net Asset Value", value: (system.nav && system.nav.toString()) },
    { property: "Total Shares", value: (system.totalShares && system.totalShares.toString()) },
    { property: "Share Price", value: (system.sharePrice && system.sharePrice.toString()) },
    { property: "WETH Price", value: (system.assetPrice && system.assetPrice.toString()) },
    { property: "Vault Balance", value: (system.vaultBalance && system.vaultBalance.toString()) },
    { property: "Vault WETH Balance", value: (system.vaultAsset && system.vaultAsset.toString()) },
    { property: "Trader Address", value: system.trader },
  ];
  
  const investorStatsColumns = [
    { name: "property" },
    { name: "value" },
  ];

  const investorStatsRows = [
    { property: "Shares Holding", value: (systemInvestor.shares && systemInvestor.shares.toString()) },
    { property: "Equity Value", value: (systemInvestor.shares && system.sharePrice && (systemInvestor.shares.mul(system.sharePrice)).toString()) },    
    { property: "Investor Address", value: systemInvestor.investor },
  ];
  
  return (
    <div id="system">      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Section        
            type = "jelly"
            title = {`Fund ${systemId}`}
            titleSize = "small"
            body = {
              <VuiBox height="300px">
                <VuiTypography color="text" height="180px">
                  Fund description...
                </VuiTypography>
                <Divider />
                
                {isTrader && 
                <VuiBox display="flex" alignItems="center" justifyContent="center">
                  <VuiButton variant="contained" color="info" onClick={submitBuyOrder} sx={{margin: "10px"}}>
                    BUY ASSET
                  </VuiButton>
                  <VuiButton variant="contained" color="error" onClick={submitSellOrder} sx={{margin: "10px"}}>
                    SELL ASSET
                  </VuiButton>
                </VuiBox>
                }
              </VuiBox>
            }
            minHeight = "300px"
          />
        </Grid>                                
        <Grid item xs={12} md={8}>
          <Section        
            title = "Net Asset Value"
            titleSize = "small"
            body = {
              <VuiBox height="300px">
                <NAV />
              </VuiBox>
            }
            minHeight = "300px"
          />
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Section        
            title = "Fund Stats"
            titleSize = "small"
            body = {
              <VuiBox>       
                <FundStats columns={fundStatsColumns} rows={fundStatsRows} />
              </VuiBox>
            }
            minHeight = "340px"
          />    
        </Grid>                                                     
        <Grid item xs={12} md={5}>
          <Section        
            title = "Portfolio Allocation"
            titleSize = "small"
            body = {
              <VuiBox height="300px">
                <Portfolio />
              </VuiBox>
            }
            minHeight = "300px"
          />
        </Grid>                                
                
        <Grid item xs={12} md={7}>
          <Section        
            title = "Your Equity Value"
            titleSize = "small"
            body = {
              <VuiBox height="300px">
                <NAV />
              </VuiBox>
            }
            minHeight = "300px"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Section        
            title = "Your Investment Stats"
            titleSize = "small"
            body = {
              <VuiBox>                                    
                <InvestorStats columns={investorStatsColumns} rows={investorStatsRows} />
                <Divider />
                
                <VuiBox display="flex" alignItems="center" justifyContent="center">
                  <VuiButton variant="contained" color="info" onClick={buySystemShares} sx={{margin: "10px"}}>
                    BUY SHARES
                  </VuiButton>
                  <VuiButton variant="contained" color="error" onClick={sellSystemShares} sx={{margin: "10px"}}>
                    SELL SHARES
                  </VuiButton>
                </VuiBox> 
              </VuiBox>
            }
            minHeight = "340px"
          />    
        </Grid>           
                
      </Grid>      
      <Divider />
            
    </div>
  );
}
