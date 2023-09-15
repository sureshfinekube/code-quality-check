import React, { Fragment, useState } from "react";
import Multistep from "react-multistep";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSevan from "./StepSeven";
// import StepEight from "../Register/StepEight";
// import PageTitle from "../../../layouts/PageTitle";

const Wizard = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    Password: "",
    storeName: "",
    domainName: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const steps = [
    { name: "Personal Info", component: <StepOne /> },
    { name: "Store Info", component: <StepTwo /> },
    { name: "Metamask", component: <StepThree /> },
    { name: "Contractor", component: <StepFour /> },
    { name: "Features ", component: <StepFive /> },
    { name: "Pay Features", component: <StepSix /> },
    { name: "Packages", component: <StepSevan /> },
    // { name: "Pay Packages", component: <StepEight /> },
  ];
  const prevStyle = {
    background: "#F7FAFC",
    borderWidth: "0px",
    color: "#333333",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "12px 18px",
    border: "1px solid #EEEEEE",
    marginRight: "1rem",
  };
  const nextStyle = {
    background: "#886CC0",
    borderWidth: "0px",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "12px 18px",
  };
  return (
    <Fragment>
      {/* <PageTitle activeMenu="Components" motherMenu="Home" /> */}

      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"> Sign up Form </h4>
            </div>
            <div className="card-body">
              <form
                onSubmit={(e) => e.preventDefault()}
                id="step-form-horizontal"
                className="step-form-horizontal"
              >
                <Multistep
                  showNavigation={true}
                  steps={steps}
                  prevStyle={prevStyle}
                  nextStyle={nextStyle}
                  data={formData}
                  handleChange={handleChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Wizard;
