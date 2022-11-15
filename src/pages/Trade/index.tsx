import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import * as TC from 'utils/tc';

export default function Trade() {
  const [systems, setSystems] = useState<any[]>([]);
    
  useEffect(() => {
    async function init() {
      await fetchTradingSystems();
    }
    init();
  }, []);
  
  async function fetchTradingSystems() {
    const accounts = await TC.getAccounts();
    const trader = accounts[0];
    
    const newSystems = await TC.fetchSystems(trader);
    setSystems(systems => newSystems);
  }

  async function createTradingSystem() {
    let tx = await TC.tc.createTradingSystem();
    console.log(tx);
    
    // setSystems(systems => [...systems, system]);
  }
  
  return (
    <div id="trade">
      <VuiButton variant="contained" color="info" onClick={createTradingSystem}>
        Create a Trading System
      </VuiButton>
      <Divider />
      
      <SystemList systems={systems} />
    </div>
  );
}
