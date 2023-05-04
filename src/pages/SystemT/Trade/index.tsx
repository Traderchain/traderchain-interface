import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import { useSystemT } from 'utils/system_t';

export default function Trade() {
  const { symbol } = useParams<{ symbol: string }>();
  const [prices, setPrices] = useState<any[]>([]);
  const { fetchPrices } = useSystemT();

  useEffect(() => {
    async function init() {
      await getPrices();
    }
    init();
  }, []);

  async function getPrices() {    
    if (!symbol)  return;

    const prices = await fetchPrices(symbol);
    setPrices(prices);
  }

  return (
    <div id="trade">
      trade
    </div>
  );
}
