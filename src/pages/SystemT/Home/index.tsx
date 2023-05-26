import { useState, useEffect } from 'react';
import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import Heading from 'components/Heading';
import { useSystemT } from 'utils/system_t';
import * as Utils from 'utils';

export default function Home() {
  const [watches, setWatches] = useState<any[]>([]);
  const { fetchWatchlist } = useSystemT();

  useEffect(() => {
    async function init() {
      await getWatchlist();
    }
    init();
  }, []);

  async function getWatchlist() {
    const watches = await fetchWatchlist();
    setWatches(watches);
  }

  const watchList = watches.map((watch,k) => {
    const {id, symbol, pid, start_date, bt, market} = watch;    
    
    let desc = [`Start Date: ${start_date}`, `Market: ${Utils.firstCap(market)}`];
    let description = desc.map((d, k) => <span key={k}>{d}<br/></span>);

    return (
      <Grid key={k} item xs={12} md={3}>
        <Section
          type = "blue"
          title = {symbol.toUpperCase()}
          body = {<VuiTypography color="text">{description}</VuiTypography>}
          more = {{label: "See Trades", to: `/SystemT/trade/${symbol}?pid=${pid}`}}
        />        
      </Grid>                
    );
  });

  return (
    <div id="home" style={{ padding: "0 10px" }}>      
      <Heading title="INTRODUCING SYSTEM T" />      
      <VuiBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Section                            
              type = "jelly"
              title = "A Trend Following System"
              titleSize = "small"
              body = {
                <VuiTypography color="white" sx={{ fontSize: "16px", fontWeight: "400", lineHeight: "1.6em", margin: "10px 0" }}>
                  System T is a cutting-edge trend following system designed to maximize profits, increase the win rate, and revolutionize your trading success.
                  One of the standout features of System T is its remarkable capability to run a million backtests for each optimal moving average tailored to a specific asset. 
                  This rigorous analysis ensures that System T identifies the most effective moving average, providing you with precise buy and sell signals. 
                </VuiTypography>
              }
              minHeight = "150px"              
            />            
          </Grid>
          <Grid item xs={12} md={6}>
            <Section              
              title = "Empowering Profitable Traders"
              titleSize = "small"
              body = {
                <VuiTypography color="light" sx={{ fontSize: "16px", fontWeight: "400", lineHeight: "1.6em", margin: "10px 0" }}>
                  System T incorporates carefully calibrated parameters such as the average true range, overbought/oversold indicators, volatility levels, and a robust stop loss mechanism. 
                  By seamlessly integrating these advanced features, System T empowers traders to capitalize on lucrative opportunities, boost profitability, and achieve a higher success rate in their trades. 
                  Experience the future of trading with System T and unlock your full potential in the market.
                </VuiTypography>
              }              
              minHeight = "150px"              
            />            
          </Grid>
        </Grid>
      </VuiBox>      
      <Divider />
      <Divider />

      <Heading title="FEATURED TRADING SYSTEMS" />                  
      <VuiBox>
        <Grid container spacing={2}>
          {watchList}  
        </Grid>      
      </VuiBox>
    </div>
  );
}
