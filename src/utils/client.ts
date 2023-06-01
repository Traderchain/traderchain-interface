import { useDispatch, useSelector } from "react-redux";
import AuthStore from 'stores/auth';
import CommonDialogStore from 'stores/commonDialog';
import SpinnerStore from 'stores/spinner';

export function useCommonDialog() {
  const dispatch = useDispatch();
  
  function showDialog({ title, content }: any) {    
    dispatch(CommonDialogStore.actions.setOpen({ open: true, title, content }));
  }
  
  function showError(err: any) {
    const title = "Error";
    const content = (typeof err == 'object') ? err.message : `${err}`;
    dispatch(CommonDialogStore.actions.setOpen({ open: true, title, content }));
  }

  function hideDialog() {    
    dispatch(CommonDialogStore.actions.setOpen({ open: false }));
  }
  
  return { showDialog, showError, hideDialog };
}

export function useSpinner() {
  const dispatch = useDispatch();
  
  function setOpen({ open }: any) {    
    dispatch(SpinnerStore.actions.setOpen({ open }));
  }
  
  function showSpinner() {    
    setOpen({ open: true });    
  }

  function hideSpinner() {
    setOpen({ open: false });
  }

  return { setOpen, showSpinner, hideSpinner };
}

export function useAuth() {
  const { isAuthenticated } = useSelector((state: any) => state.auth );
  const dispatch = useDispatch();
  
  function setAuthenticated(authenticated: boolean) {    
    dispatch(AuthStore.actions.setAuthenticated(authenticated));
  }

  return { isAuthenticated, setAuthenticated };
}

export function isMobile() { 
  return getClient().viewXS || false; 
}

export function isBrowser() { 
  return (typeof window !== 'undefined'); 
}

export function getClient() {
  let client: any = {};
  if (typeof window !== 'undefined') {
    const viewWidth = $(window).width() || 520;
    client.viewXS = viewWidth < 768;
    client.viewSM = viewWidth >= 768 && viewWidth < 992;
    client.viewMD = viewWidth >= 992 && viewWidth < 1200;
    client.viewLG = viewWidth >= 1200;
  }
  else {
    client.server = true;
  }
  return client;
}

export function scrollTop(top: number = 0) {
  if (isBrowser())  $('html,body').animate({ scrollTop: top }, 'fast');
}
