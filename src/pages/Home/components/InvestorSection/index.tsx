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
            Assets are Stored in Non-Custodial Vaults
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular">            
            Invest in a Fund Simply by Buying its Shares<br/>
            Withdraw from a Fund Anytime by Selling its Shares<br/>
            No Risk of Fund Insolvency<br/>
          </VuiTypography>
        </VuiBox>
      )}
      more = {{
        label: "Start Investing",
        to: "/invest",
      }}
    />
  );
};

export default InvestorSection;
