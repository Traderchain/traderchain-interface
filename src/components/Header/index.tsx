import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Icon } from '@mui/material';
import { Context, HeaderStyles, VuiBox, VuiInput, VuiTypography } from 'traderchain-ui';
import { Page } from 'utils/constants';

const { useVisionUIController } = Context;
const { navbar, navbarContainer, navbarRow, navbarIconButton } = HeaderStyles;

export default function Header() {  
  const location = useLocation();
  const [controller] = useVisionUIController();
  const { transparentNavbar } = controller;
  const absolute = false;
  const light = false;
  const isMini = false;  
  
  let page: Page = Page.ANY;
  if (location.pathname.startsWith('/invest'))  page = Page.INVEST;
  if (location.pathname.startsWith('/trade'))  page = Page.TRADE;  
  
  return (
    <AppBar
      position="sticky"
      color="inherit"   
      sx={(theme: any) => navbar(theme, { transparentNavbar, absolute, light })}   
    >
      <Toolbar sx={(theme: any) => navbarContainer(theme)}>
        <VuiBox color="inherit" sx={(theme: any) => navbarRow(theme, { isMini })}>          
          <VuiBox mr="30px">
            <Link to="/">
              <IconButton                              
                color="inherit"
                sx={navbarIconButton}
              >
                <Icon>home</Icon>
              </IconButton>              
            </Link>
          </VuiBox>                    
          <VuiBox mr="30px">
            <Link to="/invest">
              <VuiTypography variant="button" color={page == Page.INVEST ? "white" : "text"}>
                Invest
              </VuiTypography>
            </Link>
          </VuiBox>
          <VuiBox mr="30px">
            <Link to="/trade">
              <VuiTypography variant="button" color={page == Page.TRADE ? "white" : "text"}>
                Trade
              </VuiTypography>
            </Link>
          </VuiBox>
        </VuiBox>        
        <VuiBox sx={(theme: any) => navbarRow(theme, { isMini })}>
          <VuiBox pr={1}>
            <VuiInput
              placeholder="Type here..."
              icon={{ component: "search", direction: "left" }}
            />            
          </VuiBox>
          <VuiBox color="inherit">
            <IconButton
              size="small"
              color="inherit"
              sx={navbarIconButton}
            >
              <Icon>settings</Icon>
            </IconButton>              
          </VuiBox>
        </VuiBox>        
      </Toolbar>
    </AppBar>
  );
}
