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
      if (Array.isArray(action?.payload?.data?.message)) {
        toast.error(action.payload.data?.message[0], {
          position: 'bottom-right',
        });
      } else {
        toast.error(action.payload.data?.message, {
          position: 'bottom-right',
        });
      }
    }
    return next(action);
  };
