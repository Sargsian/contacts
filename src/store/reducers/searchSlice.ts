import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  keystroke: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeKeystroke: (state, action: PayloadAction<string>) => {
      state.keystroke = action.payload;
    },
  },
});

export const { changeKeystroke } = searchSlice.actions;

export default searchSlice.reducer;