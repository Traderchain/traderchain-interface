import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import { Address } from 'utils/constants';
import * as TC from 'utils/tc';

export default function Trade() {
  const [systems, setSystems] = useState<any[]>([]);
    
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
  
  useEffect(() => {
    async function init() {
      await fetchTradingSystems();
    }
    init();
  }, []);
  
  const systemList = systems.map((system,k) => {
    const {systemId} = system;
    const type = ["", "blue", "jelly"][systemId % 3];
    
    return (
      <div key={k}>
        <Section
          type = {type}
          title = {"Trading System #" + systemId}
          body = {<VuiTypography color="text">System description...</VuiTypography>}
          more = {{label: "Detail"}}
        />
        <Divider />
      </div>
    );
  });
  
  return (
    <div id="trade">
      <VuiButton variant="contained" color="info" onClick={createTradingSystem}>
        Create a Trading System
      </VuiButton>
      <Divider />
      {systemList}
    </div>
  );
}
