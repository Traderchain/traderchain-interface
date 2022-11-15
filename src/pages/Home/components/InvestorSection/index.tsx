import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

const InvestorSection = () => {
  return (
    <Section 
      type = "blue"
      title = "Investors"
      body = {(
        <VuiBox>
          <VuiTypography color="white" variant="h6" fontWeight="bold">
            Funds are stored in Non-Custodial Vaults
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular">            
            Easy to follow a Trading System by buying its Shares similar to Mutual Funds<br/>
            Withdraw funds anytime by selling shares without worrying about Fund Insolvency
          </VuiTypography>
        </VuiBox>
      )}
      more = {{
        label: "Start investing"
      }}
    />
  );
};

export default InvestorSection;
