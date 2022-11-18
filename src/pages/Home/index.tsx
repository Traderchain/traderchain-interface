import { Grid, Divider } from "@mui/material";
import IntroSection from './components/IntroSection';
import TraderSection from './components/TraderSection';
import InvestorSection from './components/InvestorSection';

export default function Home() {

  return (
    <div id="home">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IntroSection />
        </Grid>                
        <Grid item xs={12} md={11}>
          <InvestorSection />
        </Grid>                        
        <Grid item xs={12} md={10}>          
          <TraderSection />
        </Grid>
      </Grid>
      <Divider />            
    </div>
  );
}
