import { Link } from 'react-router-dom';
import { clone } from 'utils';

export default function TCLink(_props: any) {  
  const props: any = clone(_props);
  const { to, children }: any = props;
  if (to === undefined || to === null)  return <a {...props}>{children}</a>;
  
  delete props.to;
  
  const isExternal = to.startsWith("http");
  if (!isExternal)  return <Link to={to} {...props}>{children}</Link>;
  
  delete props.params;
  delete props.query;
  
  return <a href={to} target="_blank" {...props}>{children}</a>;    
}
