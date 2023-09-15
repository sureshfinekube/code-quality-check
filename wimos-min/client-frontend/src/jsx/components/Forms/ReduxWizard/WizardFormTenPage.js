import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { Button, Badge, Card } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
// import {
//   signupAction,
//   loadingToggleAction,
// } from "../../../../store/actions/AuthActions";

const WizardFormTenPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const dispatch = useDispatch();

  // const onRegister = (data) => {
  //   dispatch(loadingToggleAction(true));
  //   dispatch(signupAction(data, props.history));
  // };
  //onSubmit={onRegister(props.registerData)}
  return (
    <form>
      <div className="col-md-12">
        <Grid container justify="center">
          <Card body>
            <Button variant="outline-danger">Stripe Payment Scuesss</Button>{" "}
          </Card>
        </Grid>
        <br />
        <div className="col-md-12">
          <Grid container justify="center">
            <button
              style={{
                width: "100px",
                height: "50px",
                // display: "block",
                textAlign: "center",
              }}
              type="button"
              className="previous btn btn-secondary me-2"
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              style={{
                width: "100px",
                height: "50px",
                textAlign: "center",
              }}
              type="submit"
              className="next btn btn-primary ms-1"
              // disabled={pristine || submitting}
              // onClick={}
            >
              submit
            </button>
          </Grid>
        </div>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    registerData: state.form.wizard.values,
  };
};
export default compose(
  connect(mapStateToProps, (state, props) => {
    return {
      initialValues: {
        // name: "name",
        // userName: "userName",
        // password: "password",
        // email: "email",
        // phone_number: "contactnumber",
        // nationality: "countries",
        // store_name: "storeName",
        // domain_name: "domainName",
        // wallet_id: "metaId",
      },
    };
  }),
  reduxForm({
    form: "wizard", //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
    // enableReinitialize: true,
  })
)(WizardFormTenPage);
