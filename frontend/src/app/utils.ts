import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from './store';

export const customFetchBaseQuery = (props: FetchBaseQueryArgs) => {
  return fetchBaseQuery({
    ...props,
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}${props.baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
};
