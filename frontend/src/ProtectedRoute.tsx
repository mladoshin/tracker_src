import React, { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTypedDispatch } from './redux/hooks';
import { useLazyRefreshAccessQuery } from './api/api_index';
import { IUser, setUser } from './redux/auth/slice';
import jwtDecode from 'jwt-decode';
import { Spinner } from 'flowbite-react';

function ProtectedRoute() {
  //const { auth } = useTypedSelector((state) => state.auth);
  const [refreshToken, { isLoading, isSuccess }] = useLazyRefreshAccessQuery();
  const dispatch = useTypedDispatch();

  //refresh token on initial render (before DOM is initialised)
  useLayoutEffect(() => {
    //check if the user is authenticated
    refreshAccess();
  }, []);

  async function refreshAccess() {
    try {
      const res = await refreshToken().unwrap();
      sessionStorage.setItem('access_token', res.access_token);
      const user: IUser = jwtDecode(res.access_token);
      dispatch(setUser(user));
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoading || !isSuccess) {
    return <Spinner></Spinner>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
