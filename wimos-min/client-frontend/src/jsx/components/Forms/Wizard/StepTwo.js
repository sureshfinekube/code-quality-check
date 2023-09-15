import React, { useState } from "react";
import Select from "react-select";
import renderField from "./renderField";

const StepTwo = () => {
  const options = [{ value: "Ethereum", label: "Ethereum" }];
  const [storeName, setstoreName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [domainName1, setDomainName1] = useState("");
  const handleChange = (e) => {
    setstoreName(e.target.value);
    setDomainName1(e.target.value);
    setDomainName(e.target.value);
  };
  return (
    <form>
      <div className="row">
        <div className="col-lg-12 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Store Name*</label>
            <input
              type="text"
              name="storeName"
              className="form-control"
              placeholder="Store name"
              value={storeName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Domain Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="domainName"
              value={domainName}
              required
            />
          </div>
        </div>
        <br />
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label"></label>
            <input
              type="text"
              name="domainName1"
              className="form-control"
              placeholder=".domainName"
              value={domainName1}
              disabled
            />
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Network*</label>
            <Select defaultValue={options[1]} options={options} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;
