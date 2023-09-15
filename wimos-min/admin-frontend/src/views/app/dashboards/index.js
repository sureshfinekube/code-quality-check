import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./default")
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ "./content")
);
// const UserDetails = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-users" */ './userdetails')
// );

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-users" */ "./home")
);

const ChangePass = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-users" */ "./Changepass")
);

const AnalyticsDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ "./analytics")
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ "./ecommerce")
);

const PackagesList = React.lazy(() => import("./plan-list"));

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/home`} />
        <Route
          path={`${match.url}/default`}
          render={(props) => <DashboardDefault {...props} />}
        />
        <Route
          path={`${match.url}/content`}
          render={(props) => <ContentDefault {...props} />}
        />
        {/* <Route
          path={`${match.url}/users`}
          render={(props) => <UserDetails {...props} />}
        /> */}
        <Route
          path={`${match.url}/home`}
          render={(props) => <HomePage {...props} />}
        />
        <Route
          path={`${match.url}/changepassword`}
          render={(props) => <ChangePass {...props} />}
        />
        <Route
          path={`${match.url}/ecommerce`}
          render={(props) => <EcommerceDefault {...props} />}
        />
        <Route
          path={`${match.url}/analytics`}
          render={(props) => <AnalyticsDefault {...props} />}
        />
        <Route
          path={`${match.url}/packages-list`}
          render={(props) => <PackagesList {...props} />}
        />
        {/* 
      <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/content`}
        component={ContentDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/ecommerce`}
        component={EcommerceDefault}
        roles={[UserRole.Editor]}
      />
      <ProtectedRoute
        path={`${match.url}/analytics`}
        component={AnalyticsDefault}
        roles={[UserRole.Editor]}
      />
      */}

        {/* <Redirect to="/error" /> */}
      </Switch>
    </Suspense>
  );
};
export default Dashboards;
