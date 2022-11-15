import { Card, Icon } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';

// import cardBg from "assets/images/card-bg.png";

const TraderSection = () => {  
  return (
    <Card sx={({ breakpoints }: any) => ({
      // backgroundImage: `url(${cardBg})`,
      // backgroundSize: "cover",
      // backgroundPosition: "50%",      
    })}>
      <VuiBox display="flex" flexDirection="column" sx={{ minHeight: "210px" }}>
        <VuiBox display="flex" flexDirection="column" mb="auto">
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="3px">
            Traders
          </VuiTypography>
          <VuiTypography color="white" variant="h6" fontWeight="regular">
            <b>Place orders directly on Uniswap</b>
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular">
            Manage funds and get commission like a Hedge Fund Manager
          </VuiTypography>
        </VuiBox>
        <VuiBox justifySelf="flex-end">
          <VuiTypography
            component="a"
            href="#"
            variant="button"
            color="white"
            fontWeight="regular"
            mt="10px"
            sx={{
              mr: "5px",
              display: "inline-flex",
              alignItems: "center",
              justifySelf: "flex-end",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            Getting started
            <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default TraderSection;
