import { createReducer, createSlice } from "@reduxjs/toolkit";

import Comment from "../actions/Comment";
import { addComment, fetchCommentFromNet } from "../actions";

const initialState = [];

const isActionStartWithComment = (action) => {
  return action.type.startsWith("comment");
};

const actionReducerBuilder = (builder) => {
  builder
    .addCase(fetchCommentFromNet.fulfilled, (state, action) => {
      console.log(action.payload);
      action.payload.forEach((comment) => {
        state.push(new Comment(comment.name));
      });
    })
    .addCase(addComment, (state, action) => {
      state.push(new Comment(action.payload));
    })
    .addMatcher(isActionStartWithComment, (state, action) => {
      console.log("matcher isActionStartWithComment", state);
    })
    .addDefaultCase((state, action) => {});
};

const commentReducer = createReducer(initialState, actionReducerBuilder);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: actionReducerBuilder,
});

export default commentSlice.reducer;
