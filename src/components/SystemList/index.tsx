import { Grid, Divider } from '@mui/material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

interface SystemListProps {
  systems: any[]
}

export default function SystemList({ systems }: SystemListProps) {
  const systemList = systems.map((system,k) => {
    const {systemId, name, description} = system;
    const type = ["jelly", "", "blue"][(systemId-1) % 3];
    
    return (
      <Grid key={k} item xs={12} md={4}>
        <Section
          type = {type}
          title = {name || `Fund ${systemId}`}
          body = {<VuiTypography color="text">{description}</VuiTypography>}
          more = {{label: "See Details", to: `/system/${systemId}`}}
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
