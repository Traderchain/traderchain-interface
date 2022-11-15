import { Card, Icon } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';

import cardBg from "assets/images/card-bg.png";
import cardBgJelly from "assets/images/card-bg-jellyfish.png";

export default function Section({ type, title, body, more }: any) {
  let sx: any = {};
  if (type) {    
    sx.backgroundSize = "cover";
    sx.backgroundPosition = "50%";    
  }
  if (type == "blue") {
    sx.backgroundImage = `url(${cardBg})`;          
  }
  if (type == "jelly") {
    sx.backgroundImage = `url(${cardBgJelly})`;          
  }
    
  return (
    <Card sx={({ breakpoints }: any) => (sx)}>
      <VuiBox display="flex" flexDirection="column" sx={{ minHeight: "210px" }}>
        <VuiBox display="flex" flexDirection="column" mb="auto">     
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="3px">
            {title}
          </VuiTypography>
          {body}
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
            {more.label}
            <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}
