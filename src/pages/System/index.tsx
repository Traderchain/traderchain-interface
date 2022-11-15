import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { VuiBox, VuiButton, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import * as TC from 'utils/tc';

export default function System() {
  const { systemId } = useParams<{ systemId?: string }>()  
  
  return (
    <div id="system">
      <Section        
        title = {"Trading System #" + systemId}
        body = {<VuiTypography color="text">System description...</VuiTypography>}
      />
    </div>
  );
}
