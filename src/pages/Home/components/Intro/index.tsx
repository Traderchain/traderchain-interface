import { Card, Icon } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';

import cardBg from "assets/images/card-bg.png";

const Intro = () => {
  return (
    <Card
      sx={({ breakpoints }) => ({
        background: `url(${cardBg})`,
        backgroundSize: "cover",
        borderRadius: "20px",
        height: "100%",
        [breakpoints.only("xl")]: {
          gridArea: "1 / 1 / 2 / 2",
        },
      })}
    >
      <VuiBox display="flex" flexDirection="column" sx={{ height: "100%" }}>
        <VuiBox display="flex" flexDirection="column" mb="auto">
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="3px">
            Traderchain
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
            Decentralized Marketplace for Trading Systems
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
            Decentralized Platform for Copy Trading	
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
          	Decentralized Platform for Mutual Funds
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
          	Decentralized Platform for Hedge Funds	
          </VuiTypography>
          <VuiTypography color="white" variant="button" fontWeight="regular">
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
};

export default Intro;