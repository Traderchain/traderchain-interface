import { configureStore } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple'
import AuthStore from './auth';
import CommonDialogStore from './commonDialog';

const PERSISTED_KEYS: string[] = ['auth'];

const store = configureStore({ 
  reducer: { 
    auth: AuthStore.reducer,
    commonDialog: CommonDialogStore.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['commonDialog/setOpen'],
        ignoredPaths: ['commonDialog'],
      },
    })
    .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;
