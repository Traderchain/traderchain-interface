import { Card, Icon } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';

import cardBg from "assets/images/card-bg-jellyfish.png";

const Investor = () => {
  return (
    <Card sx={() => ({      
      height: "250px",
      py: "32px",
      backgroundImage: `url(${cardBg})`,
      backgroundSize: "cover",
      backgroundPosition: "50%"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>          
          <VuiTypography color="white" variant="h3" fontWeight="bold">
            Investors
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            Funds will be stored in a Non-Custodial Vault<br/>
            Easy to buy & sell shares of a system similar to Mutual Funds
          </VuiTypography>
        </VuiBox>
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
          Start investing
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default Investor;
