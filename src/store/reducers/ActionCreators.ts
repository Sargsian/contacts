import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContact } from '../../models/IContact';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contact/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IContact[]>(
        'http://localhost:3004/contacts'
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('не удалось загрузить контакты');
    }
  }
);
