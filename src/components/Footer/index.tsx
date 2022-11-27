import { IconButton, Icon } from '@mui/material';
import { GitHub as GitHubIcon, Article as ArticleIcon } from '@mui/icons-material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Link from 'components/Link';
import { Outlink } from 'utils/constants';

export default function Footer() {
  return (
    <VuiBox
      display="flex"      
      justifyContent="space-between"
      direction="row"
      component="footer"
      padding="30px 15px"
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
    </VuiBox>
  );
}
