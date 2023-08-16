import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import { Admin } from '../../../backend/node_modules/@prisma/client';
import { PackageType } from '../components/package/PackagesTable';
import { logout } from '../redux/auth/slice';
import { GetPackageDto } from '../../../backend/src/package/dto/get-package.dto';
import { CreatePackageDto } from '../../../backend/src/package/dto/create-package.dto';
// export type TSite = components['schemas']['Site'];
// export type TClient = components['schemas']['Client'];
// export type RecordSiteBody = Pick<TSite, 'Favicon' | 'Title' | 'Domain'>;
// export type TYandexOAuthResult = components['schemas']['YandexAPIAccessResult'];

type LoginResponse = {
  access_token: string;
  refreshToken: string;
  user: Pick<Admin, 'id' | 'email' | 'name'>;
};

type RefreshAccessResponse = {
  access_token: string;
};

export type FetchAllPackage = {
  name: string;
  tracking_number: string;
  status: string;
  start_date: string;
};

export type FetchAllPackagesResponse = FetchAllPackage[];

export interface FetchPackageResponse extends Omit<PackageType, "start_date" | "expected_delivery_date"> {
  start_date: string;
  expected_delivery_date: string;
}

export interface CreatePackageBody extends Omit<CreatePackageDto, "start_date" | "expected_delivery_date"> {
  start_date: string;
  expected_delivery_date: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = window.sessionStorage.getItem('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(args);
  if (result.error && result.error.status === 401) {
    if ((args as any).url === 'auth/refresh') {
      api.dispatch(logout());
      window.location.href = `${window.location.origin}/signin`;
      return result;
    }
    // try to get a new token
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      window.sessionStorage.setItem(
        'access_token',
        (refreshResult.data as any).access_token,
      );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      window.location.href = `${window.location.origin}/signin`;
    }
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Packages', 'Routes'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Pick<Admin, 'email' | 'pass'>>({
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
      Pick<Admin, 'email' | 'pass' | 'name'>
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
    fetchAllPackages: builder.query<FetchAllPackagesResponse, void>({
      query: () => ({
        url: `package`,
      }),
    }),
    fetchPackage: builder.query<FetchPackageResponse, string>({
      query: (id) => ({
        url: `package/${id}`,
      }),
    }),
    updatePackage: builder.mutation<
      FetchPackageResponse,
      { id: string; data: Partial<Exclude<CreatePackageBody, 'routeId'>> }
    >({
      query: ({ id, data }) => ({
        url: `/package/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    createPackage: builder.mutation<FetchPackageResponse, CreatePackageBody>({
      query: (data) => ({
        url: `/package`,
        method: 'POST',
        body: data,
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
  useFetchAllPackagesQuery,
  useLazyFetchPackageQuery,
  useUpdatePackageMutation,
  useCreatePackageMutation,
} = appApi;
