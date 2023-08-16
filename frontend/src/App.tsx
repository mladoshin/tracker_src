import React from 'react';
import './App.css';
import { Navbar } from 'flowbite-react';
import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import SignInView from './views/auth/SignInView';
import SignUpView from './views/auth/SignUpView';
import ProtectedRoute from './ProtectedRoute';
import Account from './views/account';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter basename='admin'>
      <Routes>
        <Route path="/" element={<h1>Main page</h1>}/>
        <Route path="signin" element={<SignInView/>}/>
        <Route path="account" element={<ProtectedRoute/>}>
          <Route path="" element={<Account/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </Provider>
  );
}
export default App;
