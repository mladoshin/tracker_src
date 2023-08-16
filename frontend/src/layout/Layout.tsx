import React from 'react';
import TopNavbar from './Navbar';
import { Sidebar } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './Sidebar';

function Layout() {
  return (
    <>
      <TopNavbar />
      <AppSidebar />
      <main className="ml-60 p-8">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
