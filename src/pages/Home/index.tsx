import { Grid, Divider } from "@mui/material";
import IntroSection from './components/IntroSection';
import TraderSection from './components/TraderSection';
import InvestorSection from './components/InvestorSection';

export default function Home() {

  return (
    <div id="home">
      <IntroSection />
      <Divider />      
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TraderSection />
        </Grid>        
        <Grid item xs={12} md={12}>
          <InvestorSection />      
        </Grid>
      </Grid>
      <Divider />
      
      
    </div>
  );
}
