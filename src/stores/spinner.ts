import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false };

const slice = createSlice({
  name: "spinner",
  initialState,
  reducers: {    
    setOpen(state, action) {
      const {open} = action.payload;      
      state.open = open;      
    },    
  },
});

export default slice;
