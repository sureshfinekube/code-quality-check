import React, { lazy, Suspense, useEffect } from "react";
/// Components
import Index from "./jsx";
import { connect, useDispatch } from "react-redux";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  useHistory,
} from "react-router-dom";
// action
import { runLogoutTimer } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import Login from "./jsx/pages/Login";
import SignUp from "./jsx/pages/Registration";
import ForgotPassword from "./jsx/pages/ForgotPassword";
import StripeSuccess from "./jsx/components/Forms/Register/StripeSuccess";
import Error404 from "./jsx/pages/Error404";
import ParticlesView from "./jsx/components/Particles/Particles";
// import StripeUpdation from "./jsx/components/Dashboard/package/StripeUpdation";
//const SignUp = lazy(() => import("./jsx/pages/Registration"));
//const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
//const Login = lazy(() => import("./jsx/pages/Login"));

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [authStat, setAuthStat] = React.useState();
  useEffect(() => {
    runLogoutTimer(dispatch, props.history);
  }, [dispatch, props.history]);
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };
  //console.log("authStatus", props.authStatus);
  // React.useEffect(() => {
  //   if (props.authStatus) setAuthStat(true);
  //   else if (props.authStatus === false) setAuthStat(false);
  //   else if (props.authStatus === undefined) setAuthStat(false);
  //   else if (props.authStatus === null) {
  //     if (!props.auth.clientId) setAuthStat(false);
  //   }
  // }, [props.authStatus]);

  // };
  // console.log("authStat", authStat);
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/page-register" component={SignUp} />
      <Route path="/page-forgot-password" component={ForgotPassword} />
      {/* <Route 
      path="/selectstore" component={StoreSelect} /> */}
      {/* <Route path="/login">
        <Redirect to="/login"></Redirect>
      </Route> */}
      <Route path="/stripe-success" component={StripeSuccess} />
      <Route path="*" component={Error404} />
      {/* <Route path="/stripe-updation" component={StripeUpdation} /> */}
    </Switch>
  );
  // if (props.authStatus === true) {
  //   if (props.location.pathname === "/") {
  //     history.push("/dashboard");
  //   }
  return (
    <>
      {props.authStatus ? (
        <>
          {props.location.pathname === "/" ? history.push("/dashboard") : null}
          <Suspense
            fallback={
              <div id="preloader">
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
              </div>
            }
          >
            <Index />
          </Suspense>
        </>
      ) : props.authStatus === false ? (
        <>
          {props.location.pathname === "/" &&
          localStorage.getItem("AuthStatus") === null ? (
            history.push("/login")
          ) : (
            <Suspense
              fallback={
                <div id="preloader">
                  <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                  </div>
                </div>
              }
            ></Suspense>
          )}
          <ParticlesView />
          <div className="vh-100">
            <Suspense
              fallback={
                <div id="preloader">
                  <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                  </div>
                </div>
              }
            >
              {routes}
            </Suspense>
          </div>
        </>
      ) : (
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        ></Suspense>
      )}
    </>
  );
}
//   } else if (props.authStatus === false || props.authStatus === null) {
//     if (
//       props.location.pathname === "/" ||
//       props.location.pathname === "/dashboard"
//     ) {
//       history.push("/login");
//     }
//     return (
//       <>
//         <ParticlesView />
//         <div className="vh-100">
//           <Suspense
//             fallback={
//               <div id="preloader">
//                 <div className="sk-three-bounce">
//                   <div className="sk-child sk-bounce1"></div>
//                   <div className="sk-child sk-bounce2"></div>
//                   <div className="sk-child sk-bounce3"></div>
//                 </div>
//               </div>
//             }
//           >
//             {routes}
//           </Suspense>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <Suspense
//         fallback={
//           <div id="preloader">
//             <div className="sk-three-bounce">
//               <div className="sk-child sk-bounce1"></div>
//               <div className="sk-child sk-bounce2"></div>
//               <div className="sk-child sk-bounce3"></div>
//             </div>
//           </div>
//         }
//       ></Suspense>
//     );
//   }
// }

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authStatus: state.auth.authstatus,
  };
};

export default withRouter(connect(mapStateToProps)(App));
