import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import "./helpers/Firebase";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import { NotificationContainer } from "./components/common/react-notifications";
import {
  isMultiColorActive,
  adminRoot,
  UserRole,
} from "./constants/defaultValues";
import { getDirection } from "./helpers/Utils";
import { ProtectedRoute } from "./helpers/authHelper";
import AuthLayout from "./layout/authLayout/authLayout";
import NonAuthLayout from "./layout/nonAuthLayout/nonAuthLayout";
//import handleProfile from './views/app/dashboards/Changepass'

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/app/index")
);

// const ViewHome = React.lazy(() =>
//   import(/* webpackChunkName: "views" */ './views/home')
// );

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/unauthorized")
);

const App = ({ locale }) => {
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [direction]);

  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <NotificationContainer />
          {isMultiColorActive && <ColorSwitcher />}
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <Route
                  path={adminRoot}
                  render={() => (
                    <AuthLayout>
                      <ViewApp />
                    </AuthLayout>
                  )}
                  roles={[UserRole.Admin, UserRole.Editor]}
                />
                <Route
                  path="/auth"
                  render={(props) => (
                    <NonAuthLayout>
                      <ViewUser {...props} />
                    </NonAuthLayout>
                  )}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/unauthorized"
                  exact
                  render={(props) => <ViewUnauthorized {...props} />}
                />
                {/* <Route path="/profile" exact render={ handleProfile } /> */}
                {/* <Route
                  path="/"
                  exact
                  render={(props) => <ViewHome {...props} />}
                /> */}
                {/*
                <Redirect exact from="/" to={adminRoot} />
                */}
                <Redirect to="/admin" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
