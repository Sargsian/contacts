import { IContact } from '../models/IContact';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


export const contactAPI = createApi({
  reducerPath: 'contactAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  tagTypes: ['Contact'],
  endpoints: (build) => ({
    fetchAllContacts: build.query<IContact[], {email: string, limit: number}>({
      query: (details) => ({
        url: `/contacts?author=${details.email}`,
        params: {
          _limit: details.limit,
        },
      }),
      providesTags: (result) => ['Contact'],
    }),
    createContact: build.mutation<IContact[], IContact>({
      query: (contact) => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: build.mutation<IContact[], {contact: IContact, email: string}>({
      query: (details) => ({
        url: `/contacts/${details.contact.id}`,
        method: 'PUT',
        body: details.contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    removeContact: build.mutation<IContact[], {contact: IContact, email: string}>({
      query: (details) => ({
        url: `/contacts/${details.contact.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});
