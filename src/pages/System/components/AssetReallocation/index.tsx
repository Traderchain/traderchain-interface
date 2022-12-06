import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiInput, VuiTypography } from 'traderchain-ui';
import { useAuth, usdcAmountBN, amountBN, amountStr, amountFloat, amountCurrency, formatUsdc, formatWeth, numberFormat, parseAmount, parseShares } from 'utils';
import { hasWallet, useTcContracts } from 'utils/tc';
import FundStats from '../FundStats';
import * as Utils from 'utils';
import ExplorerLink from 'components/ExplorerLink';

export default function AssetReallocation({ system }: any) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('buy');
  const [usdcAmount, setUsdcAmount] = useState<any>('');
  const [wethAmount, setWethAmount] = useState<any>('');
  const { placeBuyOrder, placeSellOrder } = useTcContracts();  
  const { showDialog, showError, hideDialog } = Utils.useCommonDialog();  

  function onOpen(_mode: string) {
    setMode(_mode);
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }
    
  function onChangeUsdcAmount(e: any) {    
    const amount = parseAmount(e.target.value);
    if (amount === false)  return;
    setUsdcAmount(amount);
    
    if (amount && system.assetPrice) {      
      const weth_amount = (amount / amountFloat(system.assetPrice,6)).toFixed(6);
      setWethAmount(weth_amount);
    }
  }

  function onChangeWethAmount(e: any) {    
    const amount = parseAmount(e.target.value);
    if (amount === false)  return;
    setWethAmount(amount);
    
    if (amount && system.assetPrice) {
      const usdc_amount = (amount * amountFloat(system.assetPrice,6)).toFixed(4);
      setUsdcAmount(usdc_amount);
    }
  }
  
  async function submitBuyOrder() {    
    const tx = await placeBuyOrder(system.systemId, usdcAmountBN(usdcAmount));
    showDialog({ title: 'Transaction Detail', content: <ExplorerLink type="txn" hash={tx.hash} /> });
    onClose();
  }

  async function submitSellOrder() {    
    const tx = await placeSellOrder(system.systemId, amountBN(wethAmount));
    showDialog({ title: 'Transaction Detail', content: <ExplorerLink type="txn" hash={tx.hash} /> });
    onClose();
  }

  const assetStatsColumns = [
    { name: "property" },
    { name: "value" },
  ];

  const assetStatsRows = [    
    { property: "USDC Balance", value: system.vaultBalance && formatUsdc(system.vaultBalance) },  
    { property: "WETH Balance", value: system.vaultAsset && formatWeth(system.vaultAsset) },
    { property: "WETH Price", value: system.assetPrice && formatUsdc(system.assetPrice) },
  ];

  const title = mode == 'sell' ? 'Sell Asset' : 'Buy Asset';
  const content = (
    <VuiBox sx={{ width: {sm: "420px"} }}>
      <FundStats columns={assetStatsColumns} rows={assetStatsRows} />
      <Divider />

      {mode == 'buy' &&
      <VuiBox mb={2}>
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
            USDC Amount
          </VuiTypography>
        </VuiBox>                  
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <VuiInput type="text" placeholder="USDC Amount..." fontWeight="500" value={usdcAmount} onChange={onChangeUsdcAmount} />
          </Grid>
          <Grid item xs={4}>
            <VuiBox ml={1} pt={0.4}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ fontSize: "75%" }}>
                ≈ {wethAmount} WETH
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={4}>
            <VuiButton variant="contained" color="info" onClick={submitBuyOrder} size="small" sx={{ padding: "10px" }}>
              BUY ASSET
            </VuiButton>
          </Grid>
        </Grid>                  
      </VuiBox>}

      {mode == 'sell' &&
      <VuiBox mb={2}>
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
            WETH Amount
          </VuiTypography>
        </VuiBox>                  
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <VuiInput type="text" placeholder="WETH Amount..." fontWeight="500" value={wethAmount} onChange={onChangeWethAmount} />
          </Grid>
          <Grid item xs={4}>
            <VuiBox ml={1} pt={0.4}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ fontSize: "75%" }}>
                ≈ {usdcAmount} USDC
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={4}>
            <VuiButton variant="contained" color="error" onClick={submitSellOrder} size="small" sx={{ padding: "10px" }}>
              SELL ASSET
            </VuiButton>
          </Grid>
        </Grid>                  
      </VuiBox>}
    </VuiBox>
  );

  return (
    <VuiBox>
      <VuiBox display="flex" alignItems="center" justifyContent="center">
        <VuiButton variant="contained" color="info" onClick={() => onOpen('buy')} sx={{margin: "10px"}}>
          BUY ASSET
        </VuiButton>
        <VuiButton variant="contained" color="error" onClick={() => onOpen('sell')} sx={{margin: "10px"}}>
          SELL ASSET
        </VuiButton>
      </VuiBox>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
      >      
        <DialogTitle id="asset-reallocation-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <VuiButton variant="text" onClick={onClose}>Close</VuiButton>
          <VuiButton variant="outlined" onClick={onClose} autoFocus>OK</VuiButton>
        </DialogActions>      
      </Dialog>
    </VuiBox>
  );
}
