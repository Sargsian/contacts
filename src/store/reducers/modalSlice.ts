import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  contactModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalState: (state, action: PayloadAction<boolean>) => {
      state.contactModal = action.payload;
    },
  },
});

export const { modalState } = modalSlice.actions;

export default modalSlice.reducer;