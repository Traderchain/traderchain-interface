import Button from 'components/Button';
import { isDevelopmentEnv, isProductionEnv } from 'utils';
import { ServerStatus } from 'utils/constants'

export default function Home() {
  
  return (
    <div>
      <h2>Home</h2>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>REACT_APP_DOMAIN: {process.env.REACT_APP_DOMAIN}</p>
      <p>isDevelopmentEnv: {isDevelopmentEnv() ? 'true' : 'false'}</p>
      <p>isProductionEnv: {isProductionEnv() ? 'true' : 'false'}</p>
      <p>ServerStatus.SUCCESS: {ServerStatus.SUCCESS}</p>
      <p>ServerStatus.FAILURE: {ServerStatus.FAILURE}</p>
      <Button />
    </div>
  );
}
