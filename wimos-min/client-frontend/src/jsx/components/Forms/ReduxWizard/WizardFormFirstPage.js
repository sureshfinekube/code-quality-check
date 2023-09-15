import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import validate from "./validate";
import renderField from "./renderField";

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  // const handle = () => {
  //   localStorage.setItem("name", name);
  //   localStorage.setItem("username", username);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="validate-redux-form row">
        <div className="col-md-12">
          <Field
            name="name"
            type="text"
            component={renderField}
            label="Name"
            required
          />

          {/* value={name}
					onChange={(e) => setName(e.target.value)} */}
        </div>
        <div className="col-md-12">
          <Field
            name="userName"
            // placeholder="username"
            type="text"
            component={renderField}
            label="user name"
            value={username}
            required
          />
        </div>
        <br />
        <div className="col-sm-12" textAlign="center">
          <button
            style={{
              width: "100px",
              height: "50px",
              display: "block",
              textAlign: "center",
            }}
            type="submit"
            className="btn btn-primary next"
            // onClick={handle}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default compose(
  connect((state, props) => {
    return {
      // fields: ["name", "userName"],
      initialValues: {
        name: "Name",
        userName: "username",
      },
    };
  }),
  reduxForm({
    form: "wizard", //

    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
    enableReinitialize: true,
  })
)(WizardFormFirstPage);
