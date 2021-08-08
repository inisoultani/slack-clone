import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import messageReducer from '../features/messagesSlice';
import commentReducer from '../reducers/commentsReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    comments: commentReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
