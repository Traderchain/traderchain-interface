import { Grid, Divider } from '@mui/material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

interface SystemListProps {
  systems: any[]
}

export default function SystemList({ systems }: SystemListProps) {
  const systemList = systems.map((system,k) => {
    const {systemId} = system;
    const type = ["jelly", "", "blue"][(systemId-1) % 3];
    
    return (
      <Grid key={k} item xs={12} md={4}>
        <Section
          type = {type}
          title = {"Trading System #" + systemId}
          body = {<VuiTypography color="text">System description...</VuiTypography>}
          more = {{label: "Show details", to: `/system/${systemId}`}}
        />
        <Divider />
      </Grid>                
    );
  });
  
  return (
    <VuiBox>
      <Grid container spacing={2}>
        {systemList}  
      </Grid>      
    </VuiBox>
  );
}
