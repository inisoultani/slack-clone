import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import commentReducer from '../reducers/commentsReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    comments: commentReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
