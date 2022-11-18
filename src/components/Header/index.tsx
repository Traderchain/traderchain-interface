import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Icon } from '@mui/material';
import { Context, HeaderStyles, VuiBox, VuiInput, VuiTypography, VuiButton } from 'traderchain-ui';
import * as Utils from 'utils';
import { Page } from 'utils/constants';

const { useVisionUIController } = Context;
const { navbar, navbarContainer, navbarRow, navbarIconButton } = HeaderStyles;

export default function Header() {  
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const {showDialog, hideDialog} = Utils.useAlertDialog();
  const location = useLocation();
  const [controller] = useVisionUIController();
  const { transparentNavbar } = controller;
  const absolute = false;
  const light = false;
  const isMini = false;  
  
  let page: Page = Page.ANY;
  if (location.pathname.startsWith('/invest'))  page = Page.INVEST;
  if (location.pathname.startsWith('/trade'))  page = Page.TRADE;  
        
  async function connect() {
    showDialog({ title: 'Title1', content: 'Content1' });
  }
  
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
          <VuiBox pr={2}>
            <VuiInput
              placeholder="Type here..."
              icon={{ component: "search", direction: "left" }}
            />            
          </VuiBox>
          <VuiButton variant="contained" color="primary" size="medium" onClick={connect}>
            Connect
          </VuiButton>
          <VuiBox color="inherit" sx={{ display: "none" }}>
            <IconButton size="small" color="inherit" sx={navbarIconButton}>
              <Icon>settings</Icon>
            </IconButton>              
          </VuiBox>
        </VuiBox>        
      </Toolbar>
      
    </AppBar>
  );
}
