import React, { useState } from "react";

import renderField from "./renderField";

const StepOne = () => {
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = () => {
    setFirstName();
    setUserName();
    setPhoneNumber();
    setEmail();
    setPassword();
    // console.log(setFirstName);
    // console.log(setUserName);
    // console.log(setPhoneNumber);
    // console.log(email);
    // console.log(password);
    let value = localStorage.setItem("firstName");

    // console.log(value);
  };

  return (
    <form onSubmit={handleChange}>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Name*</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              // value={firstName}
              placeholder="Parsley"
              required
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">User Name*</label>
            <input
              type="text"
              name="userName"
              // value={userName}
              className="form-control"
              placeholder="Montana"
              required
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Email Address*</label>
            <input
              type="email"
              className="form-control"
              // value={email}
              id="inputGroupPrepend2"
              aria-describedby="inputGroupPrepend2"
              placeholder="example@example.com"
              required
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Phone Number*</label>
            <input
              type="text"
              // value={phoneNumber}
              name="phoneNumber"
              className="form-control"
              placeholder="(+1)408-657-9007"
              required
            />
          </div>
        </div>
        <div className="col-lg-12 mb-3">
          <div className="form-group mb-3">
            <label className="text-label">Password*</label>
            <input
              type="text"
              name="password"
              // value={password}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default StepOne;
