import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
} from "reactstrap";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";

import CustomSelectInput from "components/common/CustomSelectInput";
import { NotificationManager } from "components/common/react-notifications";
// import { ChangePasswordNewOne } from 'utils/axios/requestHandler';
import { ChangePasswordAction } from "redux/auth/actions";

const Change = ({
  onChangePass,
  changePassErr,
  changePassStat,
  changePassSuccess,
  ChangePasswordAction,
}) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [new_password, setPassword] = useState("");
  const [resetpassword, resetPassword] = useState("");
  const [old_password, oldPassword] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (changePassErr) {
      // NotificationManager.warning(changePassErr, 'Login Error', 3000, null, null, '');
      NotificationManager.warning(
        changePassErr,
        "Password Erorr",
        3000,
        null,
        null,
        ""
      );
    }
    setLoader(false);
  }, [changePassErr]);

  useEffect(() => {
    // if (changePassStat) history.push('/admin')
    if (changePassSuccess) {
      NotificationManager.success(
        "Successfully changed password!",
        "Succes",
        3000,
        null,
        null,
        ""
      );
      // this.state = {username: "", setPassword: "", new_password: ""};
      setUsername("");
      setPassword("");
      resetPassword("");
      oldPassword("");
      setLoader(false);
    }
  }, [changePassSuccess]);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const passwordHandlerreset = (event) => {
    resetPassword(event.target.value);
  };
  const oldPasswordNew = (event) => {
    oldPassword(event.target.value);
  };

  const changPassword = (e) => {
    e.preventDefault();
    setLoader(true);

    if (new_password === resetpassword) {
      // console.log("Password changed scuessfully")

      ChangePasswordAction({ new_password, old_password, username });
    } else {
      NotificationManager.warning(
        "Password miss matched",
        "Password Erorr",
        3000,
        null,
        null,
        ""
      );
      setLoader(false);
    }
  };
  return (
    <>
      <Row>
        <Colxx xxs="12"></Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Change Password</CardTitle>
              {/* <Form> */}
              <FormGroup>
                <Label for="Username">Username</Label>
                <Input
                  type="Username"
                  name="Username"
                  id="exampleUsername"
                  value={username}
                  onChange={usernameHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label for="oldpassword">Old password</Label>
                <Input
                  type="oldpassword"
                  name="oldpassword"
                  id="oldpassword"
                  onChange={oldPasswordNew}
                  value={old_password}
                />
              </FormGroup>

              <FormGroup>
                <Label for="passwordBasic">New Password</Label>
                <Input
                  type="password"
                  name="passwordBasic"
                  id="passwordBasic"
                  value={new_password}
                  onChange={passwordHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label for="passwordBasic">Re-type Password</Label>
                <Input
                  type="password"
                  name="passwordBasic"
                  id="passwordBasic"
                  value={resetpassword}
                  onChange={passwordHandlerreset}
                />
              </FormGroup>
              {loader ? (
                <Button
                  color="primary"
                  // onClick={changPassword}
                  className="btn-shadow btn-multiple-state show-spinner"
                  size="lg"
                >
                  {/* Update */}

                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  {/* <span className="label">Update</span> */}
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={changPassword}
                  className="btn-shadow btn-multiple-state"
                  size="lg"
                >
                  {/* Update */}

                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Update</span>
                </Button>
              )}
              {/* </Form> */}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { onChangePass, changePassErr, changePassStat, changePassSuccess } =
    authUser;
  return { onChangePass, changePassErr, changePassStat, changePassSuccess };
};

export default connect(mapStateToProps, {
  ChangePasswordAction,
})(Change);
