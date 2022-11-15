import { Divider } from "@mui/material";
import IntroSection from './components/IntroSection';
import TraderSection from './components/TraderSection';
import InvestorSection from './components/InvestorSection';

export default function Home() {

  return (
    <div id="home">
      <IntroSection />
      <Divider />      
      <TraderSection />
      <Divider />      
      <InvestorSection />      
    </div>
  );
}
