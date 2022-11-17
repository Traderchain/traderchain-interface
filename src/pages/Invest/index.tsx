import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import * as TC from 'utils/tc';

export default function Invest() {
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
    
  return (
    <div id="invest">      
      <SystemList systems={systems} />
    </div>
  );
}
