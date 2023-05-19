import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from 'react-loader-spinner';

export default function Spinner() {
  const { open } = useSelector((state: any) => state.spinner );
    
  return (
    <div id="loading-spinner">
      {open && <InfinitySpin width='180' color="white" />}
    </div>
  );
}
