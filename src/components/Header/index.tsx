import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { Context } from 'traderchain-ui';
import { HeaderStyles } from 'traderchain-ui';
import { VuiBox, VuiInput } from 'traderchain-ui';

const {
  useVisionUIController,
} = Context;

const {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,  
} = HeaderStyles;

export default function Header() {  
  const [controller] = useVisionUIController();
  const { transparentNavbar } = controller;
  const absolute = false;
  const light = false;
  const isMini = false;  
  
  return (
    <AppBar
      position="sticky"
      color="inherit"   
      sx={(theme: any) => navbar(theme, { transparentNavbar, absolute, light })}   
    >
      <Toolbar sx={(theme: any) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme: any) => navbarRow(theme, { isMini })}>
          <Icon>home</Icon>
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
