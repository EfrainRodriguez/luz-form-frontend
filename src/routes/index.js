import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Switch, Route } from 'react-router-dom';
// layout
import DashboardLayout from '../layouts/dashboard';
// guards
import AuthGuard from '../guards/AuthGuard';
import LoggedGuard from '../guards/LoggedGuard';
// paths
import { PATH_AUTH, PATH_HOME, PATH_PROFILE, PATH_PRODUCTS } from './paths';
// loading page
import LoadingPage from '../pages/LoadingPage';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      {routes.map((route, index) => {
        const Component = route.component || Fragment;
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

export const routes = [
  {
    exact: true,
    path: PATH_AUTH.login,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/Login'))
  },
  {
    exact: true,
    path: PATH_AUTH.forgotPassword,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/ForgotPassword'))
  },
  {
    exact: true,
    path: PATH_AUTH.changePassword,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/ResetPassword'))
  },
  // private routes for logged and ok status user ------------------------
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      // home
      {
        exact: true,
        path: PATH_HOME.root,
        component: () => <div>Home</div>
      },
      // profile
      {
        exact: true,
        path: PATH_PROFILE.root,
        component: lazy(() => import('../pages/profile/Profile'))
      },
      // products
      {
        exact: true,
        path: PATH_PRODUCTS.list,
        component: lazy(() => import('../pages/products/ProductList'))
      }
    ]
  }
];
