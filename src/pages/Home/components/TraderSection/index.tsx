import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

export default function TraderSection() {
  return (
    <Section
      type="blue"
      title="Manage a Decentralized Fund"
      body={(
        <VuiBox>
          <VuiTypography color="text" variant="h6" fontWeight="regular" sx={{ width: { md: "40%" } }}>
            The protocol’s liquidity layer is built on top of Decentralized Exchanges which provide a safe way for fund managers to exchange their fund assets.<br />
          </VuiTypography>
        </VuiBox>
      )}
      more={{
        label: "Getting Started",
        to: "/trade",
      }}
      minHeight="190px" />
  );
}
