import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelId: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectChannel: (state, action) => {
      console.log(state, action);
      state.channelId = action.payload;
    },
  },
});

export const { selectChannel } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectedChannelId = (state) => state.app.channelId;

export default appSlice.reducer;
