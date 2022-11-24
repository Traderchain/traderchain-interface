import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import { useAuth } from 'utils';
import { useTcContracts } from 'utils/tc';

export default function Invest() {
  const [systems, setSystems] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const { getAccounts, fetchAllSystems, fetchSystems, fetchSystem } = useTcContracts();
  
  useEffect(() => {
    async function init() {
      await fetchTradingSystems();
    }
    init();
  }, [isAuthenticated]);
    
  async function fetchTradingSystems() {    
    const newSystems = await fetchAllSystems();
    setSystems(systems => newSystems);
  }
    
  return (
    <div id="invest">      
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Section                    
            body = {
              <VuiBox display="flex" alignItems="center" justifyContent="center">
                <VuiTypography variant="h3" color="white" fontWeight="bold">
                  Start Investing
                </VuiTypography>
              </VuiBox>
            }
            minHeight = "50px"
          />
        </Grid>
      </Grid>                                
      <Divider />
    
      <SystemList systems={systems} />
    </div>
  );
}
