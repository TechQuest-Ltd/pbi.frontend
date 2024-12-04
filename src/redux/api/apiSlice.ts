import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const { VITE_APP_BASE_API_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_APP_BASE_API_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem('token');
    // Remove quotes if they exist
    const cleanToken = token ? token.replace(/^"|"$/g, '') : null;
    if (cleanToken) {
      headers.set('authorization', `Bearer ${cleanToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  // Ensure error.data is treated as an object with an optional 'message' property
  const errorData = result.error?.data as { code?: string } | undefined;

  if (errorData && errorData.code === 'EXPIREDTOKEN') {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => {
    return {
      // Login
      login: builder.mutation({
        query: data => ({
          url: '/auth/login',
          method: 'POST',
          body: data,
        }),
      }),

      // Verify Token
      verifyToken: builder.query({
        query: token => ({
          url: `/auth/verify/${token}`,
          method: 'GET',
        }),
      }),

      // Create User
      createUser: builder.mutation({
        query: data => ({
          url: '/auth/signup',
          method: 'POST',
          body: data,
        }),
      }),

      // Get User
      getUser: builder.query({
        query: id => ({
          url: `/users/${id}`,
          method: 'GET',
        }),
      }),

      // Forgot Password
      forgotPassword: builder.mutation({
        query: data => ({
          url: 'auth/forgot-password',
          method: 'POST',
          body: data,
        }),
      }),

      // Reset Password
      resetPassword: builder.mutation({
        query: ({ resetToken, password }) => ({
          url: `auth/reset-password/${resetToken}`,
          method: 'POST',
          body: { password },
        }),
      }),

      // Create User Profile
      createUserProfile: builder.mutation({
        query: ({ account_type, picture, nationality, address, bio, sectors, matching_sectors, id }) => ({
          url: `/users/${id}/profile`,
          method: 'POST',
          body: { account_type, picture, nationality, address, bio, sectors, matching_sectors },
        }),
      }),

      // Get Profile
      getUserProfile: builder.query({
        query: id => ({
          url: `/users/${id}/profile`,
          method: 'GET',
        }),
      }),

      // Get Sectors
      getSectors: builder.query({
        query: () => ({
          url: '/sectors',
          method: 'GET',
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useVerifyTokenQuery,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCreateUserProfileMutation,
  useGetUserProfileQuery,
  useGetSectorsQuery,
  useGetUserQuery,
} = apiSlice;
