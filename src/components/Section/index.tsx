import { Card, Icon } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Link from 'components/Link';

import cardBg from "assets/images/card-bg.png";
import cardBgJelly from "assets/images/card-bg-jellyfish.png";

export default function Section({ type, title, titleSize, body, more, minHeight }: any) {
  let sx: any = {};
  if (type == "blue") {
    sx.backgroundImage = `url(${cardBg})`;              
    sx.backgroundSize = "cover";
  }
  else if (type == "jelly") {
    sx.backgroundImage = `url(${cardBgJelly})`;          
    sx.backgroundSize = "cover";
    sx.backgroundPosition = "50%";
  }
    
  const sectionTitle = <VuiTypography color="white" variant={titleSize == "small" ? "h4" : "h3"} fontWeight="bold" mb="3px">{title || ''}</VuiTypography>;

  return (
    <Card sx={({ breakpoints }: any) => (sx)}>
      <VuiBox display="flex" flexDirection="column" sx={{ minHeight: minHeight || "210px" }}>
        <VuiBox display="flex" flexDirection="column" mb="auto">          
          {more && more.to ? <Link to={more.to}>{sectionTitle}</Link> : sectionTitle}
          {body}
        </VuiBox>
        
        {more && 
        <VuiBox justifySelf="flex-end">
          <Link to={more.to || "#"}>
          <VuiTypography            
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
          </Link>
        </VuiBox>}
        
      </VuiBox>
    </Card>
  );
}
