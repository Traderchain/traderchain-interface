import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

const TraderSection = () => {
  return (
    <Section       
      title = "Traders"
      body = {(
        <VuiBox>
          <VuiTypography color="white" variant="h6" fontWeight="regular">
            <b>Place Orders Directly on Uniswap</b>
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular">
            Manage funds and get Commission like a Hedge Fund Manager
          </VuiTypography>
        </VuiBox>
      )}
      more = {{
        label: "Getting started",
        to: "/trade",
      }}
    />
  );
};

export default TraderSection;
