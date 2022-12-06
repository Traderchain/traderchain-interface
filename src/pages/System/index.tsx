import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Grid, Card, Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography, VuiInput } from 'traderchain-ui';
import { useAuth, usdcAmountBN, amountBN, amountStr, amountFloat, amountCurrency, formatUsdc, formatWeth, numberFormat, parseAmount, parseShares } from 'utils';
import { hasWallet, useTcContracts } from 'utils/tc';
import * as Utils from 'utils';
import Section from 'components/Section';
import ExplorerLink from 'components/ExplorerLink';
import NAV from './components/NAV';
import Portfolio from './components/Portfolio';
import FundStats from './components/FundStats';
import InvestorStats from './components/InvestorStats';
import AssetReallocation from './components/AssetReallocation';
import EditableText from 'components/EditableText';
import { useFetch } from 'utils/fetch';

export default function System() {
  const { systemId } = useParams<{ systemId?: string }>();
  const [account, setAccount] = useState<string>('');
  const [system, setSystem] = useState<any>({ systemId });
  const [systemInvestor, setSystemInvestor] = useState<any>({ systemId });
  const [isTrader, setIsTrader] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { getAccounts, fetchSystem, fetchSystemInvestor, buyShares, sellShares } = useTcContracts();
  const { showDialog, showError, hideDialog } = Utils.useCommonDialog();  
  const [investAmount, setInvestAmount] = useState<any>('');
  const [investShares, setInvestShares] = useState<number>(0);
  const [redeemShares, setRedeemShares] = useState<number>(0);
  const [redeemAmount, setRedeemAmount] = useState<number>(0);
  const { putData } = useFetch();
  
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
    if (!hasWallet())  return;
    
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
  
  async function changeSystemName(name: string) {
    const url = `/api/system?systemId=${systemId}`;
    const data = { name };
    const result = await putData(url, data);
    system.name = result.name;
    setSystem(system);
  }

  function onChangeInvestAmount(e: any) {    
    const amount = parseAmount(e.target.value);
    if (amount === false)  return;
    setInvestAmount(amount);
    
    if (amount && system.sharePrice) {      
      const shares = usdcAmountBN(amount).div(system.sharePrice).toNumber();
      setInvestShares(shares);
    }
  }
  
  async function buySystemShares() {
    if (!investAmount)  return;
    
    const usdcAmount = usdcAmountBN(investAmount);
    const tx = await buyShares(systemId!, usdcAmount);
    showDialog({ title: 'Transaction Detail', content: <ExplorerLink type="txn" hash={tx.hash} /> });
    
    setInvestAmount('');
    setInvestShares(0);
  }
  
  function onChangeRedeemShares(e: any) {    
    const shares = parseShares(e.target.value);
    if (shares === false)  return;
    setRedeemShares(shares);
    
    if (shares && system.sharePrice) {      
      const amount = amountFloat(system.sharePrice,6) * shares;
      setRedeemAmount(amount);
    }
  }
  
  async function sellSystemShares() {
    if (!redeemShares)  return;
    
    const shares = amountBN(redeemShares, 0);
    const tx = await sellShares(systemId!, shares);    
    showDialog({ title: 'Transaction Detail', content: <ExplorerLink type="txn" hash={tx.hash} /> });
    
    setRedeemShares(0);
    setRedeemAmount(0);
  }

  const fundStatsColumns = [
    { name: "property" },
    { name: "value" },
  ];

  const fundStatsRows = [
    { property: "Net Asset Value", value: system.nav && formatUsdc(system.nav) },
    { property: "Total Shares", value: system.totalShares && numberFormat(system.totalShares.toNumber()) },
    { property: "Share Price", value: system.sharePrice && amountCurrency(system.sharePrice, 6, 6) },    
    { property: "USDC Balance", value: system.vaultBalance && formatUsdc(system.vaultBalance) },
    { property: "WETH Balance", value: system.vaultAsset && formatWeth(system.vaultAsset) },
    { property: "WETH Price", value: system.assetPrice && formatUsdc(system.assetPrice) },
    { property: "Trader Address", value: <ExplorerLink hash={system.trader} /> },
  ];
  
  const investorStatsColumns = [
    { name: "property" },
    { name: "value" },
  ];

  const investorStatsRows = [
    { property: "Shares Holding", value: systemInvestor.shares && numberFormat(systemInvestor.shares.toNumber()) },
    { property: "Equity Value", value: systemInvestor.shares && system.sharePrice && formatUsdc(systemInvestor.shares.mul(system.sharePrice)) },    
    { property: "USDC Balance", value: systemInvestor.usdcBalance && formatUsdc(systemInvestor.usdcBalance) },
    { property: "Your Address", value: <ExplorerLink hash={systemInvestor.investor} /> },
  ];
  
  return (
    <div id="system">      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Section        
            type = "jelly"
            title = {
              <EditableText name="system-name" value={system.name || `Fund ${systemId}`} changeText={changeSystemName} />
            }
            titleSize = "small"
            body = {
              <VuiBox height="300px">
                <VuiTypography color="text" height="180px">
                  Fund description...
                </VuiTypography>
                <Divider />
                
                {isTrader && 
                <VuiBox display="flex" alignItems="center" justifyContent="center">
                  <AssetReallocation system={system} />
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
                <VuiBox sx={{ borderBottom: "1px solid rgb(45, 55, 72)" }}>
                  <InvestorStats columns={investorStatsColumns} rows={investorStatsRows} />
                </VuiBox>
                <Divider />
                
                <VuiBox mb={2}>
                  <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                      Invest USDC Amount
                    </VuiTypography>
                  </VuiBox>                  
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <VuiInput type="text" placeholder="USDC Amount..." fontWeight="500" value={investAmount} onChange={onChangeInvestAmount} />
                    </Grid>
                    <Grid item xs={4}>
                      <VuiBox ml={1} pt={0.4}>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ fontSize: "75%" }}>
                          ≈ {numberFormat(investShares)} Shares
                        </VuiTypography>
                      </VuiBox>
                    </Grid>
                    <Grid item xs={4}>
                      <VuiButton variant="contained" color="info" onClick={buySystemShares} size="small" sx={{ padding: "10px" }}>
                        BUY SHARES
                      </VuiButton>
                    </Grid>
                  </Grid>                  
                </VuiBox>
                
                <VuiBox mb={2}>
                  <VuiBox mb={1} ml={0.5}>
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                      Redeem Shares
                    </VuiTypography>
                  </VuiBox>                  
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <VuiInput type="text" placeholder="Shares to Sell..." fontWeight="500" value={redeemShares || ''} onChange={onChangeRedeemShares} />
                    </Grid>
                    <Grid item xs={4}>
                      <VuiBox ml={1} pt={0.4}>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ fontSize: "75%" }}>
                          ≈ {numberFormat(redeemAmount)} USDC
                        </VuiTypography>
                      </VuiBox>
                    </Grid>
                    <Grid item xs={4}>
                      <VuiButton variant="contained" color="error" onClick={sellSystemShares} size="small" sx={{ padding: "10px" }}>
                        SELL SHARES
                      </VuiButton>
                    </Grid>
                  </Grid>                  
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
