import { Card, Icon } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';

import cardBg from "assets/images/card-bg-jellyfish.png";

const TraderchainSection = () => {
  return (
    <Card sx={({ breakpoints }: any) => ({
      backgroundImage: `url(${cardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "50%",      
    })}>
      <VuiBox display="flex" flexDirection="column" sx={{ minHeight: "210px" }}>
        <VuiBox display="flex" flexDirection="column" mb="auto">
          <VuiTypography color="white" variant="h3" mb="3px">
            TRADERCHAIN <b>PROTOCOL</b>
          </VuiTypography>
          <VuiTypography color="white" variant="h6" fontWeight="bold">
            Decentralized Marketplace for Trading Systems            
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular">            
            Decentralized Platform for Copy Trading<br/>          
          	Decentralized Platform for Mutual Funds<br/>          
          	Decentralized Platform for Hedge Funds<br/>	          
          	Decentralized Exchange for ETFs
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
            Learn more
            <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default TraderchainSection;
