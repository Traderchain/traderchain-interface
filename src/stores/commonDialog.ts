import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false, title: '', content: '' };

const slice = createSlice({
  name: "commonDialog",
  initialState,
  reducers: {    
    setOpen(state, action) {
      const {open, title, content} = action.payload;
      if (open) {
        state.title = title || '';
        state.content = content || '';  
      }      
      state.open = open;
    },
    setContent(state, action) {
      const {title, content} = action.payload;
      state.title = title;
      state.content = content;
    },
  },
});

export default slice;
