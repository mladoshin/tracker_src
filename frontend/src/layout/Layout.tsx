import React from 'react'
import TopNavbar from './Navbar'
import { Sidebar } from 'flowbite-react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <TopNavbar/>
      <Sidebar/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout
