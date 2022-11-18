import { configureStore } from '@reduxjs/toolkit';
import AuthStore from './auth';
import AlertDialogStore from './alertDialog';

const reducer = { 
  auth: AuthStore.reducer,
  alertDialog: AlertDialogStore.reducer,
};

const store = configureStore({ reducer });
export default store;
