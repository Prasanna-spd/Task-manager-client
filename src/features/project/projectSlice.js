import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../services/helper.js";
import axios from "axios";

const initialState = {
  progress: { isCompleted: 0, inProgress: 0 },
};

export const fetchProjectProgress = createAsyncThunk(
  "project/fetchProgress",
  async (projectId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/projects/progress/${projectId}`
      );
      // const rest = await response.json;
      // console.log(rest);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectProgress.fulfilled, (state, action) => {
      if (action.payload) {
        const { isCompleted, inProgress } = action.payload;
        state.progress = { isCompleted, inProgress };
        console.log("reporting frm projectslice", state.progress);
      }
    });
  },
});

// export const { actions: projectActions } = projectSlice.actions;
export const getCompleted = (state) => state.progress.progress.isCompleted;
export const getInprogress = (state) => state.progress.progress.inProgress;

export default projectSlice.reducer;
