import { useState, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import SystemList from 'components/SystemList';
import { useTcContracts } from 'utils/tc';

export default function TopFunds() {
  const [systems, setSystems] = useState<any[]>([]);
  const { fetchAllSystems } = useTcContracts();

  useEffect(() => {
    async function init() {
      await fetchTradingSystems();
    }
    init();
  }, []);

  async function fetchTradingSystems() {
    const newSystems = await fetchAllSystems();
    setSystems(systems => newSystems);
  }

  return (
    <div id="invest">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Section
            body={(
              <VuiBox display="flex" alignItems="center" justifyContent="center">
                <VuiTypography variant="h4" color="white" fontWeight="bold">
                  Top Performing Funds
                </VuiTypography>
              </VuiBox>
            )}
            minHeight="30px" />
        </Grid>
      </Grid>
      <Divider />

      <SystemList systems={systems} />
    </div>
  );
}
