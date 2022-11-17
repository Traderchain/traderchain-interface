import { Grid, Divider } from "@mui/material";
import IntroSection from './components/IntroSection';
import TraderSection from './components/TraderSection';
import InvestorSection from './components/InvestorSection';

export default function Home() {

  return (
    <div id="home">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <IntroSection />
        </Grid>                
        <Grid item xs={12} md={11}>
          <TraderSection />
        </Grid>                        
        <Grid item xs={12} md={10}>
          <InvestorSection />      
        </Grid>
      </Grid>
      <Divider />            
    </div>
  );
}
