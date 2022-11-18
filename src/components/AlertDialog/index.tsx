import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { VuiButton } from 'traderchain-ui';
import AlertDialogStore from 'stores/alertDialog';

export default function AlertDialog() {
  let { open, title, content } = useSelector((state: any) => state.alertDialog );
  const dispatch = useDispatch();
  
  function onClose() {
    dispatch(AlertDialogStore.actions.setOpen({ open: false }));
  }
  
  if (!title || !content)  open = false;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >      
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" fontSize="sm">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <VuiButton variant="text" onClick={onClose}>Close</VuiButton>
        <VuiButton variant="outlined" onClick={onClose} autoFocus>OK</VuiButton>
      </DialogActions>      
    </Dialog>
  );
}
