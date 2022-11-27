import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';

export default  function InvestorSection() {
  return (
    <Section
      title="Invest with Confidence"
      body={(
        <VuiBox>
          <VuiTypography color="text" variant="h6" fontWeight="regular" sx={{ width: { md: "40%" } }}>
            Investors’ assets are stored in Non-Custodial Vaults in which investors can deposit and withdraw their investment anytime without worrying about fund insolvency.<br />
          </VuiTypography>
        </VuiBox>
      )}
      more={{
        label: "Start Investing",
        to: "/invest",
      }}
      minHeight="220px" />
  );
}
