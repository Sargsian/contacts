import { fetchContacts } from './ActionCreators';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../models/IContact';

interface ContactState {
  contacts: IContact[];
  isLoading: boolean;
  error: string;
}

const initialState: ContactState = {
  contacts: [],
  isLoading: false,
  error: '',
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.fulfilled.type]: (
      state,
      action: PayloadAction<IContact[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.contacts = action.payload;
    },
    [fetchContacts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default contactSlice.reducer;
