import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import JsonPlaceHolderApi from "../apis/JsonPlaceHolderApi";

export const addComment = createAction("comment/add");
export const fetchComment = createAction("comment/fetch");
export const fetchCommentFromNet = createAsyncThunk(
  "comment/fetchFromNet",
  async (thunkAPI) => {
    const response = await JsonPlaceHolderApi.get("comments", {
      params: { postId: 1 },
    });
    return response.data;
  },
);
