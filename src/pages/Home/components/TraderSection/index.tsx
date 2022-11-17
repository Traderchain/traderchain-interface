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
            Manage Portfolio and Get Commission like a Hedge Fund Manager<br/>
          </VuiTypography>
        </VuiBox>
      )}
      more = {{
        label: "Getting Started",
        to: "/trade",
      }}
    />
  );
};

export default TraderSection;
