import { configureStore } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple'
import AuthStore from './auth';
import AlertDialogStore from './alertDialog';

const PERSISTED_KEYS: string[] = ['auth'];

const store = configureStore({ 
  reducer: { 
    auth: AuthStore.reducer,
    alertDialog: AlertDialogStore.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;
