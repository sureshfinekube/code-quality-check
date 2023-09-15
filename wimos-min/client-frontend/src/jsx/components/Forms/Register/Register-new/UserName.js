import React, { Component, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Country from "../../ReduxWizard/Country.json";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Redirect } from "react-router";
import { logDOM } from "@testing-library/react";
// import validate from "../ReduxWizard/validate";

function UserName({
  nextStep,
  setFirstName,
  setUserName,
  errMsg,
  setErrMsg,
  firstName,
  userName,
  errName,
  setErrors,
  setUsererror,
  usererror,
  errors,
  nameleng,
  setNameleng,
}) {
  // const [countries, setCountries] = useState(Country);
  // const [searchCode, setSearchCode] = useState();
  // const [errors, setErrors] = useState();
  // const [setMessage, setSetMessage] = useState();
  // const [userName, setUserName] = useState();
  // const [firstName, setFirstName] = useState();

  const [nameErrorMsg, usernameErrorMsg] = useState("");

  const [localName, setLocalName] = useState("");
  const [userleng, setUserleng] = useState(false);

  // useEffect(() => {
  //   console.log("local name++++", userName);
  // }, [localName]);

  function Validatation(e) {
    const name = e.target.value;

    setLocalName(name);

    // console.log("name validation", name);
    // console.log("name", name);
    if (/^[a-zA-Z\s]*$/.test(name) || name === "") {
      // console.log("true");
      if (name.length >= 3) {
        setErrors(false);

        setNameleng(false);
        let text = e.target.value;
        let result = text.trim();
        setFirstName(result);
        // setErrMsg({
        //   ...errMsg,
        //   firstName: false,
        // });
      } else {
        setErrors(true);
        setNameleng(true);
        setErrMsg({
          ...errMsg,
          firstName: false,
        });
      }
    } else {
      // console.log("false");
      setErrors(true);
      // setErrMsg({
      //   ...errMsg,
      //   firstName: true,
      // });
    }
  }
  const [step, setStep] = useState(1);

  // const back = (e) => {
  //   e.preventDefault();
  //   this.props.prevStep();
  // };

  // const continues = (e) => {
  //   e.preventDefault();
  //   nextStep(1);
  // };

  const checkUserName = async (e) => {
    // console.log("setUserName", setUserName);

    const sentence = e.target.value;
    // console.log("se", sentence);
    // setUserleng(false);
    // if (sentence <= 0) {
    //   // console.log("setUsererror", usererror);

    //   setUserleng(false);
    // } else {
    //   setUserleng(true);
    // }

    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      baseURL: BaseUrl,
      withCredentials: true,
    });
    instance
      .get(
        "/auth/check-username?username=" + sentence,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log("response", response);

        if (response.data.status || sentence === "") {
          setUsererror(false);
          // console.log("setUsererror", usererror);
          let text = sentence;
          let result = text.trim();
          usernameErrorMsg(response.data.message);
          setErrMsg(false);
          setUserName(result);
          // setUserleng(false);
        } else {
          setUsererror(true);

          // console.log("usererror", response.data.errors[0].message);

          usernameErrorMsg(response.data.message);
          // usernameErrorMsg(response.data.errors[0].message);
          setErrMsg(true);
        }
        // setDomainName(e.target.value);
      })
      .catch((err) => {
        // console.log("reserrponse", err);
        // setUsererror(true);
      });
  };

  return (
    <form>
      <div className="form-group mb-3">
        <label className="mb-1">
          <strong>Name*</strong>
        </label>
        <input
          defaultValue={firstName}
          className="form-control"
          placeholder="Enter Your Name"
          label="First Name"
          onChange={(e) => {
            Validatation(e);

            // this.Validatation();
          }}
          // defaultValue={values.firstName}
        />
        {errMsg.firstName && !nameleng && (
          <h6 style={{ color: "red" }}>Name is Required</h6>
        )}
        {""} {""}
        {errors && !nameleng && (
          <h6 style={{ color: "red" }}>Name is must be letters only</h6>
        )}
        {""} {""}
        {nameleng && (
          <h6 style={{ color: "red" }}>Name must be atleast 3 characters</h6>
        )}
        <br />
        <div>
          <label className="mb-1">
            <strong>User Name*</strong>
          </label>
          <input
            defaultValue={userName}
            className="form-control"
            placeholder="Enter Your User Name"
            label="User Name"
            // onChange={setUserName}
            onChange={(e) => {
              checkUserName(e);
              // this.Validatation();
            }}

            // defaultValue={values.lastName}
          />
          {usererror ? (
            // <h6 style={{ color: "red" }}>User Name not available</h6>
            <h6 style={{ color: "red" }}>{nameErrorMsg}</h6>
          ) : errMsg.userName ? (
            <p style={{ color: "red" }}>User name is Required</p>
          ) : (
            ""
          )}
          {/* {!userleng && (
            <h6 style={{ color: "red" }}>Name must be atleast 2 characters</h6>
          )} */}
        </div>
        {/* {usererror ? (
          <p style={{ color: "red" }}>User name not available</p>
        )} */}
        {/* {errors.userName} */}
        {/* <br /> */}
        {/* <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={continues}
        >
          Next
        </button> */}
        <div className="new-account mt-3">
          <p className="">
            Already have an account?{" "}
            <Link className="text-primary" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default UserName;
