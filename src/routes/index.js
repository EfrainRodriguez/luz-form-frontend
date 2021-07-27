import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Switch, Route, Redirect } from 'react-router-dom';
// layout
import PageLayout from '../layouts';
// paths
import { PATH_FORM } from './paths';
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
    layout: PageLayout,
    path: PATH_FORM.sectionOne,
    component: lazy(() => import('../pages/sections/SectionOne'))
  },
  {
    exact: true,
    layout: PageLayout,
    path: PATH_FORM.sectionTwo,
    component: lazy(() => import('../pages/sections/SectionTwo'))
  },
  {
    exact: true,
    layout: PageLayout,
    path: PATH_FORM.sectionThree,
    component: lazy(() => import('../pages/sections/SectionThree'))
  },
  {
    exact: true,
    path: '*',
    component: () => <Redirect to={PATH_FORM.sectionOne} />
  }
];
