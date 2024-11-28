import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const { VITE_APP_BASE_API_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_APP_BASE_API_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `${token}`);
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

      // Create User
      createUser: builder.mutation({
        query: data => ({
          url: '/auth/signup',
          method: 'POST',
          body: data,
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
    };
  },
});

export const { useLoginMutation, useCreateUserMutation, useForgotPasswordMutation, useResetPasswordMutation } =
  apiSlice;
