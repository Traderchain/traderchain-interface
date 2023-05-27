import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Icon } from '@mui/material';
import { Context, HeaderStyles, VuiBox, VuiInput, VuiTypography, VuiButton } from 'traderchain-ui';
import * as Utils from 'utils';
import { useTcContracts } from 'utils/tc';
import { CHAIN_NAME, Page } from 'utils/constants';

const { useVisionUIController, setTransparentNavbar } = Context;
const { navbar, navbarContainer, navbarRow, navbarIconButton } = HeaderStyles;

export default function Header() {  
  const { isAuthenticated } = Utils.useAuth();
  const { showDialog, hideDialog } = Utils.useCommonDialog();
  const { checkConnect } = useTcContracts();
  const location = useLocation();
  const [controller, dispatch] = useVisionUIController();
  const { transparentNavbar } = controller;
  const absolute = false;
  const light = false;
  const isMini = false;  
  
  let page: Page = Page.ANY;  
  if (['/','/SystemT'].includes(location.pathname))  page = Page.HOME;
  if (location.pathname.startsWith('/invest'))  page = Page.INVEST;
  if (location.pathname.startsWith('/trade'))  page = Page.TRADE;  
  
  useEffect(() => {
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, window.scrollY === 0);
    }
    
    handleTransparentNavbar();
    window.addEventListener("scroll", handleTransparentNavbar);
        
    return () => {
      window.removeEventListener("scroll", handleTransparentNavbar);
    };
  }, [isAuthenticated]);
        
  async function onConnect() {
    await checkConnect();
  }

  return (    
    <AppBar
      position="sticky"
      color="inherit"   
      sx={(theme: any) => Utils.merge(navbar(theme, { transparentNavbar, absolute, light }), {display: { xs: "none", md: "grid" }})}
    >
      <Toolbar sx={(theme: any) => navbarContainer(theme)}>
        <VuiBox color="inherit" sx={(theme: any) => navbarRow(theme, { isMini })}>          
          <VuiBox mr="30px">
            <Link to="/SystemT">
              <IconButton color="inherit" sx={navbarIconButton}>
                <img src="/logo64.png" width="32px" />
              </IconButton>
            </Link>
          </VuiBox>                              
          <VuiBox mr="30px">
            <Link to="/SystemT">
              <VuiTypography variant="button" color="white">
                Home
              </VuiTypography>
            </Link>
          </VuiBox>
          {/*
          <VuiBox mr="30px">
            <Link to="/trade">
              <VuiTypography variant="button" color={page == Page.TRADE ? "white" : "text"}>
                Trade
              </VuiTypography>
            </Link>
          </VuiBox>
          */}
        </VuiBox>        
        <VuiBox sx={{ display: {xs: "none", sm: "block"} }}>
          <VuiBox sx={(theme: any) => navbarRow(theme, { isMini })}>
            {/*
            <VuiBox pr={2}>
              <VuiInput
                placeholder="Enter symbol..."
                icon={{ component: "search", direction: "left" }}
              />            
            </VuiBox>
            */}
            
            {/* isAuthenticated ?
            <VuiTypography variant="button" color="info">
              {CHAIN_NAME}
            </VuiTypography>
            :  
            <VuiButton variant="contained" color="primary" size="medium" onClick={onConnect}>
              Connect
            </VuiButton> */}
            
            <VuiBox color="inherit" sx={{ display: "none" }}>
              <IconButton size="small" color="inherit" sx={navbarIconButton}>
                <Icon>settings</Icon>
              </IconButton>              
            </VuiBox>        
          </VuiBox>        
        </VuiBox>        
      </Toolbar>      
    </AppBar>
  );
}
