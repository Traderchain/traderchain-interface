import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { VuiButton } from 'traderchain-ui';
import CommonDialogStore from 'stores/commonDialog';

export default function CommonDialog() {
  let { open, title, content } = useSelector((state: any) => state.commonDialog );
  const dispatch = useDispatch();
  
  function onClose() {
    dispatch(CommonDialogStore.actions.setOpen({ open: false }));
  }
  
  if (!title || !content)  open = false;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="common-dialog-title"
      aria-describedby="common-dialog-description"
    >      
      <DialogTitle id="common-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="common-dialog-description" fontSize="sm">
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
