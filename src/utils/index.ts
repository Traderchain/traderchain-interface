import { useDispatch, useSelector } from "react-redux";
import AuthStore from 'stores/auth';
import AlertDialogStore from 'stores/alertDialog';

export function useAlertDialog() {
  const dispatch = useDispatch();
  
  function showDialog({ title, content }: any) {    
    dispatch(AlertDialogStore.actions.setOpen({ open: true, title, content }));
  }

  function hideDialog() {    
    dispatch(AlertDialogStore.actions.setOpen({ open: false }));
  }
  
  return { showDialog, hideDialog };
}

export function useAuth() {
  const { isAuthenticated } = useSelector((state: any) => state.auth );
  const dispatch = useDispatch();
  
  function setAuthenticated(authenticated: boolean) {    
    dispatch(AuthStore.actions.setAuthenticated(authenticated));
  }

  return { isAuthenticated, setAuthenticated };
}
