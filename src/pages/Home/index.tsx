import { Divider } from "@mui/material";
import TraderchainSection from './components/TraderchainSection';
import TraderSection from './components/TraderSection';
import InvestorSection from './components/InvestorSection';

export default function Home() {

  return (
    <div id="home">
      <TraderchainSection />
      <Divider />      
      <TraderSection />
      <Divider />      
      <InvestorSection />      
    </div>
  );
}
