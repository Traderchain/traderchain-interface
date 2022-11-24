import { Link } from "@mui/material";
import { VuiTypography } from 'traderchain-ui';

export default function ExplorerLink({ type, hash }: any) {
  const shortedHash = hash ? `${hash.substring(0,8)}......${hash.substring(hash.length-6)}` : '';
  
  let url = "https://goerli.etherscan.io";
  if (type == 'txn')  url += "/tx/" + hash;
  else  url += "/address/" + hash;

  return (
    <VuiTypography
      component={Link}
      href={url}
      target="_blank"      
      color="info"
      variant="a"            
      sx={{ fontSize: "90%" }}
    >
      {shortedHash}
    </VuiTypography>
  );
}
