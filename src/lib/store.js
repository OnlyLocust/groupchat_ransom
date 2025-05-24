import { configureStore } from '@reduxjs/toolkit';
import msgSlice from './msgSlice.js'

export const store = configureStore({
  reducer: {
    msg:msgSlice
  },
});

// Optional: For typing
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
