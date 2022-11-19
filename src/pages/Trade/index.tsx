import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import { useAuth } from 'utils';
import { useTcContracts}  from 'utils/tc';

export default function Trade() {
  const [systems, setSystems] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const { checkConnect, getAccounts, fetchSystem, fetchSystems, createSystem } = useTcContracts();
    
  useEffect(() => {
    async function init() {
      await fetchTradingSystems();
    }
    init();
  }, [isAuthenticated]);
  
  async function fetchTradingSystems() {
    if (!await checkConnect())  return;
    
    const accounts = await getAccounts();
    const trader = accounts[0];
    
    const newSystems = await fetchSystems(trader);
    setSystems(systems => newSystems);
  }

  async function createTradingSystem() {
    const tx = await createSystem();
    console.log(tx);
    
    // setSystems(systems => [...systems, system]);
  }
  
  return (
    <div id="trade">      
      <VuiButton variant="contained" color="info" onClick={createTradingSystem}>
        START FUND
      </VuiButton>
      <Divider />
      
      <SystemList systems={systems} />
    </div>
  );
}
