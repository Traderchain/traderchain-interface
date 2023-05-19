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

export function isBrowser() { 
  return (typeof window !== 'undefined'); 
}

export function scrollTop() {
  if (isBrowser())  $('html,body').animate({ scrollTop: 0 }, 'fast');
}
