import { configureStore } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple'
import AuthStore from './auth';
import CommonDialogStore from './commonDialog';
import SpinnerStore from './spinner';

const PERSISTED_KEYS: string[] = ['auth'];

const store = configureStore({ 
  reducer: { 
    auth: AuthStore.reducer,
    commonDialog: CommonDialogStore.reducer,
    spinner: SpinnerStore.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['commonDialog/setOpen', 'spinner/setOpen'],
        ignoredPaths: ['commonDialog', 'spinner'],
      },
    })
    .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;
