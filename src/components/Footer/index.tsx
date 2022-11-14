import { VuiBox, VuiTypography } from 'traderchain-ui';

export default function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      direction="row"
      component="footer"
      position="fixed"
      bottom="0"
      padding="10px 0"
    >
      <VuiBox item="true" xs={12} sx={{ textAlign: "center" }}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: "center", fontWeight: "400 !important" }}
          color="white"
        >
          @ 2022 Traderchain
        </VuiTypography>
      </VuiBox>
      <VuiBox item="true" xs={10}>        
      </VuiBox>
    </VuiBox>
  );
}
