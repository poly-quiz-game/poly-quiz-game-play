import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import roomApi from "api/roomApi";

const initialState = {
  loading: false,
  room: {},
};

export const fetchRoom = createAsyncThunk("room/getOne", async (id) => {
  const response = await roomApi.getOne(id);
  return response.data;
});

const quizSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchRoom.pending, (state) => {
      state.loading = true;
    });
    addCase(fetchRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.room = action.payload;
    });
    addCase(fetchRoom.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Actions
export const playerActions = quizSlice.actions;

// Selectors
export const selectQuizList = (state) => state.quiz.list;
export const selectQuiz = (state) => state.quiz.quiz;
export const selectLoading = (state) => state.quiz.loading;

// Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;
