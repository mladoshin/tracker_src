'use client';

import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/api_index';
import { useTypedDispatch } from '../redux/hooks';
import { logout } from '../redux/auth/slice';

export default function AppSidebar() {
  const navigate = useNavigate();
  const [triggerLogout] = useLogoutMutation();
  const dispatch = useTypedDispatch();

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
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="fixed w-60 top-16 left-0 shadow-md">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={() => navigate('/panel/account')}
            icon={HiChartPie}>
            <p>Аккаунт</p>
          </Sidebar.Item>
          <Sidebar.Item
            onClick={() => navigate('/panel/packages')}
            icon={HiViewBoards}>
            <p>Посылки</p>
          </Sidebar.Item>
          <Sidebar.Item
            onClick={() => navigate('/panel/routes')}
            icon={HiInbox}>
            <p>Маршруты</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiUser} onClick={handleLogout}>
            <p>Выйти</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
