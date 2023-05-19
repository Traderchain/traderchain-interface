import { useState, useEffect } from 'react';
import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
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
      <Grid key={k} item xs={12} md={4}>
        <Section
          type = "blue"
          title = {symbol.toUpperCase()}
          body = {<VuiTypography color="text">{description}</VuiTypography>}
          more = {{label: "See Trades", to: `/SystemT/trade/${symbol}?pid=${pid}`}}
        />
        <Divider />
      </Grid>                
    );
  });

  return (
    <div id="home">
      <VuiBox>
        <Grid container spacing={2}>
          {watchList}  
        </Grid>      
      </VuiBox>
    </div>
  );
}
