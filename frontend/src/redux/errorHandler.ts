import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      //if we get 403 code from any api endpoint redirect to sign-in form
      if (action.payload.status === 401 || action.payload.status === 403) {
        window.location.href = `${window.location.origin}/signin`;

        //reset the access token
        window.localStorage.removeItem('access_token');
      }

      if (Array.isArray(action?.payload?.data?.message)) {
        toast.error(action.payload.data?.message[0], {
          position: 'bottom-right',
        });
      }
    }
    return next(action);
  };
