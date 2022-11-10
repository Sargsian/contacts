import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { contactAPI } from '../services/ContactService';
import contactReducer from './reducers/contactSlice';
import authReducer from './reducers/authSlice';
import modalReducer from './reducers/modalSlice';
import searchReducer from './reducers/searchSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    auth: authReducer,
    modal: modalReducer,
    search: searchReducer,
    [contactAPI.reducerPath]: contactAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
