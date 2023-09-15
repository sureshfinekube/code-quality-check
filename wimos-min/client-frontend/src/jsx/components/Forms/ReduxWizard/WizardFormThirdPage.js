import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";
import { compose } from "redux";
import { connect } from "react-redux";
import Select from "react-select";

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const options = [{ value: "Ethereum", label: "Ethereum" }];
  // let errorsObj = { storename: "", domainname: "", searchCode: "" };
  // const [errors, setErrors] = useState(errorsObj);

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        {/* <label className="font-w600">Store Name</label> */}
        <div className="col-md-12">
          <Field
            name="storeName"
            type="text"
            component={renderField}
            label="store name"
            required
          />
        </div>
      </div>
      <br />
      <div className="row">
        {/* <label className="font-w600">Domain Name</label> */}
        <div className="col-sm-6">
          <Field
            name="domainName"
            type="text"
            component={renderField}
            label="domain name"
            required
          />
        </div>

        <div className="col-sm-6">
          {/* <label className="font-w600"></label> */}
          <Field
            name="domainName1"
            type="text"
            component={renderField}
            label=".domainname"
            disabled
          />
        </div>
      </div>
      <br />

      <div className="col-md-12">
        <label className="font-w600" required>
          Network
        </label>
        <div style={{ minHeight: "100px" }}>
          <Select defaultValue={options[1]} options={options} />
        </div>{" "}
      </div>
      <div className="col-md-12">
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
            // display: "block",
            textAlign: "center",
          }}
          type="submit"
          className="next btn btn-primary ms-1"
        >
          Next
        </button>
      </div>
    </form>
  );
};
export default compose(
  connect((state, props) => {
    return {
      initialValues: {
        // Password: "Password",
        domainName1: ".domainname",
        storeName: "storename",
        domainName: "name",
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
)(WizardFormThirdPage);
