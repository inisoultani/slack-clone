import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, postConverter } from '../firebase/config';
import hash from 'object-hash';

export const getMessagesByChannelIdThunk = createAsyncThunk(
  'messages/getMessagesByChannelId',
  async (channelId, thunkAPI) => {
    const ref = db
      .collection(`channels/${channelId}/messages`)
      .withConverter(postConverter)
      .orderBy('createdAt', 'asc');
    return ref.get();
    //.then((docRef) => console.log(docRef.data().messages));
  },
);

const addMessageToState = (state, channelId, message) => {
  const messages = state[channelId];
  if (messages) {
    if (!state[channelId].some((msg) => hash(msg) === hash(message))) {
      state[channelId].push(message);
    }
  } else {
    state[channelId] = [message];
  }
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    defaultMessages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      addMessageToState(
        state,
        action.payload.channelId,
        action.payload.message,
      );
      // const messages = state[action.payload.channelId];
      // if (messages) {
      //   state[action.payload.channelId] = messages.push(action.payload.message);
      // } else {
      //   state[action.payload.channelId] = [...action.payload.message];
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesByChannelIdThunk.fulfilled, (state, action) => {
      // console.log(action.meta.arg);
      // console.log(action.payload.docs);
      if (action.meta.arg && action.payload.docs.length === 0) {
        state[action.meta.arg] = [];
      } else {
        action.payload.docs.forEach((doc) => {
          // console.log(doc.data().toString());
          // console.log(doc.created_time, ' => ', doc.data().message);
          //state[action.meta.arg] = [doc.data().message];

          addMessageToState(state, action.meta.arg, doc.data());
        });
      }
    });
  },
});

export const { addMessage } = messageSlice.actions;
export const getMessages = (state) => state.messages;
export const getMessageByChannelId = (channelId) => {
  return (state) => {
    // console.log(channelId);
    return state.messages[channelId];
  };
};

export default messageSlice.reducer;
