import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "components/common/react-notifications";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import { loginAdminAction } from "redux/actions";
import bacgroundimg from "../../assets/logos/wimos_logo_white-01.png";

const Login = ({ onLogin, loginErr, loginStat, loginAdminAction }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (loginErr) {
      NotificationManager.warning(
        loginErr,
        "Login Error",
        3000,
        null,
        null,
        ""
      );
    }
  }, [loginErr]);

  useEffect(() => {
    if (loginStat) history.push("/admin");
  }, [loginStat]);

  // login action function
  const userLogin = () => {
    let erroru = "";
    let errorp = "";
    if (!username) {
      erroru = "Please enter your username. ";
    }
    if (!password) {
      errorp = "Please enter your password. ";
    } else if (password.length < 4) {
      errorp = "Password must be longer than 3 characters. ";
    }
    if (erroru === "" && errorp === "") {
      loginAdminAction({ username, password });
    } else {
      NotificationManager.warning(
        erroru + errorp,
        "Login Error",
        3000,
        null,
        null,
        ""
      );
    }
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <img src={bacgroundimg} style={{ width: "300px" }}></img>
            {/* <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{" "}
              <NavLink to="/auth/register" className="white">
                register
              </NavLink>
              .
            </p> */}
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <div className="av-tooltip tooltip-label-bottom">
              <FormGroup className="form-group has-float-label">
                <Label>Username</Label>
                <input
                  className="form-control"
                  name="username"
                  onChange={usernameHandler}
                />
              </FormGroup>
              <FormGroup className="form-group has-float-label">
                <Label>Password</Label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={passwordHandler}
                />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/auth/forgot-password">
                  <IntlMessages id="user.forgot-password-question" />
                </NavLink>
                <Button
                  color="primary"
                  onClick={userLogin}
                  className={`btn-shadow btn-multiple-state ${
                    onLogin ? "show-spinner" : ""
                  }`}
                  size="lg"
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.login-button" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { onLogin, loginErr, loginStat } = authUser;
  return { onLogin, loginErr, loginStat };
};

export default connect(mapStateToProps, {
  loginAdminAction,
})(Login);
