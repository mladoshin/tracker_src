import { Button } from 'flowbite-react';
import React from 'react';
import { useLogoutMutation } from '../../api/api_index';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { logout } from '../../redux/auth/slice';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { user } = useTypedSelector((state) => state.auth);
  const [triggerLogout] = useLogoutMutation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await triggerLogout().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (e) {
      console.log(e);
      navigate('/signin');
    }
  }

  return (
    <div>
      <h1 className='mb-7'>{user?.name}</h1>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
}

export default Account;
