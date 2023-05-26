import { VuiBox, VuiTypography } from 'traderchain-ui';
import { Divider } from "@mui/material";

export default function Heading({ title }: any) {    
  return (
    <VuiBox>
      <VuiTypography color="white" variant="h3" fontWeight="bold">{title}</VuiTypography>
      <Divider sx={{ border: "solid 1px white" }} />
    </VuiBox>
  );
}
