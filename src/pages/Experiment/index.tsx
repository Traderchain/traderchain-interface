import { VuiButton, VuiTypography } from 'traderchain-ui';
import { isDevelopmentEnv, isProductionEnv } from 'utils/env';

export default function Experiment() {
  return (
    <div id="experiment">      
      <VuiTypography color="white" variant="h2">Experiment</VuiTypography>
      <VuiTypography color="white">        
        NODE_ENV: {process.env.NODE_ENV}<br/>
        REACT_APP_DOMAIN: {process.env.REACT_APP_DOMAIN}<br/>
        isDevelopmentEnv: {isDevelopmentEnv() ? 'true' : 'false'}<br/>
        isProductionEnv: {isProductionEnv() ? 'true' : 'false'}<br/>
        <VuiButton variant="outlined" color="light">VuiButton</VuiButton><br/>      
      </VuiTypography>
    </div>
  );
}
