import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import { Outlink } from 'utils/constants';

const IntroSection = () => {
  return (
    <Section 
      type = "jelly"
      title = {<span><span style={{fontWeight:"400"}}>TRADERCHAIN</span> PROTOCOL</span>}
      body = {(
        <VuiBox>
          <VuiTypography color="white" variant="h6" fontWeight="bold" mb="5px">
            Decentralized Marketplace for Trading Systems            
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular">            
            Decentralized Platform for Copy Trading<br/>          
            Decentralized Platform for Mutual Funds<br/>          
            Decentralized Platform for Hedge Funds<br/>	          
            Decentralized Exchange for ETFs<br/>
            Decentralized Governance for DAO Funds<br/>
          </VuiTypography>
        </VuiBox>
      )}      
      more = {{ label: "Learn More", to: Outlink.TRADERCHAIN_WHITEPAPER }}
      minHeight = "250px"
    />
  );
};

export default IntroSection;
