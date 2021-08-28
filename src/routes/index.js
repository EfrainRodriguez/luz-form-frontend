import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Switch, Route, Redirect } from 'react-router-dom';
// layout
import PageLayout from '../layouts';
import DashboardLayout from '../layouts/dashboard';
// paths
import { PATH_FORM, PATH_AUTH, PATH_PROFILE } from './paths';
// loading page
import LoadingPage from '../pages/LoadingPage';
// guards
import PageGuard from '../guards/PageGuard';
import LoggedGuard from '../guards/LoggedGuard';
import AuthGuard from '../guards/AuthGuard';

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
  // auth --------------------------------------------------
  {
    exact: true,
    path: PATH_AUTH.login,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/Login'))
  },
  // form --------------------------------------------------
  {
    exact: true,
    layout: PageLayout,
    path: PATH_FORM.sectionOne,
    component: lazy(() => import('../pages/sections/SectionOne'))
  },
  {
    exact: true,
    guard: PageGuard,
    layout: PageLayout,
    path: PATH_FORM.sectionTwo,
    component: lazy(() => import('../pages/sections/SectionTwo'))
  },
  {
    exact: true,
    guard: PageGuard,
    layout: PageLayout,
    path: PATH_FORM.sectionThree,
    component: lazy(() => import('../pages/sections/SectionThree'))
  },
  {
    exact: true,
    guard: PageGuard,
    layout: PageLayout,
    path: PATH_FORM.final,
    component: lazy(() => import('../pages/FinalPage'))
  },
  // dashboard --------------------------------------------------
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: () => <Redirect to={PATH_FORM.list} />
      },
      {
        exact: true,
        path: PATH_FORM.list,
        component: lazy(() => import('../pages/form/FormList'))
      },
      {
        exact: true,
        path: PATH_FORM.userSectionOne,
        component: lazy(() => import('../pages/form/SectionOne'))
      },
      {
        exact: true,
        path: PATH_FORM.userSectionTwo,
        component: lazy(() => import('../pages/form/SectionTwo'))
      },
      {
        exact: true,
        path: PATH_FORM.userSectionThree,
        component: lazy(() => import('../pages/form/SectionThree'))
      },
      {
        exact: true,
        path: PATH_FORM.userFinal,
        component: lazy(() => import('../pages/form/FinalPage'))
      },
      {
        exact: true,
        path: PATH_PROFILE.root,
        component: lazy(() => import('../pages/profile/Profile'))
      }
    ]
  },
  {
    exact: true,
    path: '*',
    component: () => <Redirect to={PATH_FORM.sectionOne} />
  }
];
