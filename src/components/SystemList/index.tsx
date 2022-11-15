import { Divider } from '@mui/material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

interface SystemListProps {
  systems: any[]
}

export default function SystemList({ systems }: SystemListProps) {
  const systemList = systems.map((system,k) => {
    const {systemId} = system;
    const type = ["", "blue", "jelly"][systemId % 3];
    
    return (
      <div key={k}>
        <Section
          type = {type}
          title = {"Trading System #" + systemId}
          body = {<VuiTypography color="text">System description...</VuiTypography>}
          more = {{label: "Show details", to: `/system/${systemId}`}}
        />
        <Divider />
      </div>
    );
  });
  
  return (
    <VuiBox>
      {systemList}
    </VuiBox>
  );
}
