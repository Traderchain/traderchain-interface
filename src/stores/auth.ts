import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {    
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    }    
  },
});

export default slice;
