import { useState, useEffect } from 'react';
import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import { useSystemT } from 'utils/system_t';

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
    const {id, symbol, start_date} = watch;    
    
    return (
      <Grid key={k} item xs={12} md={4}>
        <Section
          type = "blue"
          title = {symbol.toUpperCase()}
          body = {<VuiTypography color="text">{start_date || ""}</VuiTypography>}
          more = {{label: "See Trades", to: `/trade/${id}`}}
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
