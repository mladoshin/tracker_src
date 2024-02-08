// import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import SignInView from './views/auth/SignInView';
import ProtectedRoute from './ProtectedRoute';
import Account from './views/account';
import Layout from './layout/Layout';
import ListRoutesView from './views/route/ListRoutesView';
import RouteView from './views/route/RouteView';
import ListPackagesView from './views/package/ListPackagesView';
import PackageView from './views/package/PackageView';
import NoMatch from './views/404/NoMatch';
import { useEffect } from 'react';

const hash = '';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter basename={`admin${hash}`}>
        <Routes>
          {/* Redirect */}
          <Route path="/" element={<Redirect to="panel"/>}/>
          <Route path="signin" element={<SignInView />} />
          <Route path="packages/:packageId" element={<PackageView />} />
          <Route path="panel" element={<ProtectedRoute />}>
            <Route path="" element={<Layout />}>
              <Route path="account" element={<Account />} />
              <Route path="routes" element={<ListRoutesView />} />
              <Route path="routes/:routeId" element={<RouteView />} />

              <Route path="packages" element={<ListPackagesView />} />
              <Route path="packages/:packageId" element={<PackageView />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </Provider>
  );
}

function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);

  return null;
}
export { hash };
export default App;
