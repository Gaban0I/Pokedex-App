import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_NAME } from "../global";
const likesSlice = createSlice({
  name: "likes",
  initialState: {},
  reducers: {
    toggleLike: (state, action) => {
      const { pokemonId } = action.payload;
      state[pokemonId] = !state[pokemonId];
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
    },
    deleteAllLikes: (state) => {
      for (const key in state) {
        delete state[key];
      }
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
    },
    fetchLikes: (state) => {
      const likes = JSON.parse(localStorage.getItem(STORAGE_NAME));
      if (likes) {
        for (const key in likes) {
          state[key] = likes[key];
        }
      }
    },
  },
});

export const { toggleLike, deleteAllLikes, fetchLikes } = likesSlice.actions;
export default likesSlice.reducer;
