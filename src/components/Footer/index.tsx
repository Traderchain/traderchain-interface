import { Grid, Divider } from "@mui/material";
import { IconButton, Icon } from '@mui/material';
import { GitHub as GitHubIcon, Article as ArticleIcon } from '@mui/icons-material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Link from 'components/Link';
import { Outlink } from 'utils/constants';

export default function Footer() {
  return (
    <VuiBox sx={{ padding: "30px 25px" }}>
      <Divider sx={{ border: "solid 1px white" }} />
      <VuiBox sx={{ fontSize: "14px", lineHeight: "1.5" }} color="text">
        Disclaimer: This content is for informational purposes only and should not be considered legal, tax, investment, financial, or other advice.          
        You should neither take nor refrain from taking any action based on the information contained herein or any other information we provide, including blog posts, data, articles, links to third-party content, discord content, news feeds, tutorials, tweets, and videos.          
        Before making any financial, legal, technical, or other decisions, it is advisable to seek independent professional advice from a licensed and qualified individual in the relevant field.          
        This information is not intended to be comprehensive or address all aspects of our trading systems.        
      </VuiBox>
      <Divider />
      <VuiBox
        display="flex"      
        justifyContent="space-between"
        direction="row"
        component="footer"        
      > 
        <VuiBox item="true">
          <VuiTypography
            variant="button"
            sx={{ textAlign: "center", fontWeight: "400 !important" }}
            color="text"
          >
            @ 2022 Traderchain
          </VuiTypography>
        </VuiBox>
        {/*
        <VuiBox item="true">
          <Link to={Outlink.TRADERCHAIN_GITHUB}>
            <IconButton>
              <GitHubIcon sx={{ color: "#a0aec0" }} />
            </IconButton>
          </Link>        
          <Link to={Outlink.TRADERCHAIN_WHITEPAPER}>
            <IconButton>
              <ArticleIcon sx={{ color: "#a0aec0" }} />
            </IconButton>
          </Link>
        </VuiBox>
        */}
      </VuiBox>
    </VuiBox>
  );
}
