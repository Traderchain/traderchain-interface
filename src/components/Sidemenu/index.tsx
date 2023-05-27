import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Icon } from '@mui/material';
import { VuiBox, VuiTypography } from 'traderchain-ui';
import { Page } from 'utils/constants';
import * as Utils from 'utils';

export default function Sidemenu() {
  const [open, setOpen] = useState(false);  

  function show(event: any) {    
    setOpen(true);
  }

  function hide(event: any) {    
    setOpen(false);
  }

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={hide}
      onKeyDown={hide}
    >
      <List>
        {[Page.HOME].map((text, index) => (
          <Link key={index} to="/SystemT">
            <ListItem component="li">
              <VuiBox sx={{ display: "flex", alignItems: "center", width: "100%", padding: "10px" }}>
                <ListItemIcon sx={{ display: "grid", placeItem: "center" }}>
                  <Icon color="inherit">home</Icon>
                </ListItemIcon>
                <ListItemText disableTypography primary={<VuiTypography variant="button" color="white">{Utils.firstCap(text)}</VuiTypography>} />
              </VuiBox>
            </ListItem>
          </Link>
        ))}
      </List>      
    </Box>
  );
  
  return (    
    <div id="sidemenu">
      <VuiBox
        justifyContent="center"
        alignItems="center"
        width="50px"
        height="50px"
        bgColor="info"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="30px"
        bottom="30px"
        zIndex={100}
        color="white"
        sx={{ cursor: "pointer", display: { xs: "flex", md: "none" } }}
        onClick={open ? hide : show}
      >
        <Icon color="inherit">menu</Icon>
      </VuiBox>
      <Drawer
        anchor="left"
        open={open}        
        onClose={hide}
        PaperProps={{ 
          sx: { margin: "0", borderRadius: "0", background: "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)" }
        }}
      >
        {list}
      </Drawer>
    </div>
  );
}
