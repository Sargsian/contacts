import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  email: localStorage.getItem('email'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
  },
});

export const { authorize } = authSlice.actions;

export default authSlice.reducer;
