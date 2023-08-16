import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import { User } from '../../../backend/node_modules/@prisma/client';
// export type TSite = components['schemas']['Site'];
// export type TClient = components['schemas']['Client'];
// export type RecordSiteBody = Pick<TSite, 'Favicon' | 'Title' | 'Domain'>;
// export type TYandexOAuthResult = components['schemas']['YandexAPIAccessResult'];

type LoginResponse = {
  access_token: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'email' | 'name'>;
};

type RefreshAccessResponse = {
  access_token: string;
};
// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Sites', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        //headers.set("Access-Control-Allow-Credentials", 'true')
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Pick<User, 'email' | 'pass'>>({
      // query: (clientId) => `/clients/${clientId}/sites`,
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body: body,
      }),
    }),
    refreshAccess: builder.query<RefreshAccessResponse, void>({
      query: () => ({
        url: `auth/refresh`,
        credentials: 'include',
      }),
    }),
    register: builder.mutation<
      LoginResponse,
      Pick<User, 'email' | 'pass' | 'name'>
    >({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyRefreshAccessQuery,
  useLogoutMutation,
} = appApi;
