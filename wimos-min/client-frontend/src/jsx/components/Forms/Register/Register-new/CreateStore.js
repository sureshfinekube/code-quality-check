import React, { Component, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import {
  logout,
  storeAction,
  // domainAction,
} from "../../../../../store/actions/AuthActions";
import { packageAction } from "../../../../../store/actions/packageAction";
// import { UpdateStep } from "../../../../../services/AuthService";
import Etherum from "../../../../../../src/images/Ethereum-icon-purple.svg";
import binance from "../../../../../../src/images/binance-logo.svg";
import polygon from "../../../../../../src/images/polygon-matic.svg";

function CreateStore({
  nextStep,
  prevStep,
  setDomainName,
  domainName,
  setStoreName,
  storeName,
  packages,
  errMsg,
  subDomain,
  setSubDomain,
  setOwndomainName,
  owndomainName,
  domainVal,
  setDomainVal,
  setStoreVal,
  storeVal,
  setIsCustomDomain,
}) {
  const [checked, setChecked] = React.useState(true);
  const subDomainName = packages.domain.domain;
  const [domainErr, setDomainErr] = useState(false);

  function handleChecked2() {
    setDomainName("");
    setChecked(!checked);
  }
  const handleStore = (value) => {
    setStoreName(value);
    setStoreVal(false);
  };
  //const [owndomainName, setOwndomainName] = useState("wimos.io");

  // console.log("subDomainName", subDomainName);
  //   constructor(props) {
  //     super(props);
  //     this.state = { errorDomain: false, subDomainName: "" };
  //   }
  //= async () => {
  //   Validatation = () => {
  //     if (!this.state.values.storeName) {
  //       this.state.errors.storeName = (
  //         <h6 style={{ color: "red" }}>store Name Required</h6>
  //       );
  //     }
  //   };

  //   componentDidMount = async () => {
  //     const { handleChange, packages } = this.props;
  //     this.props.packageAction();
  //     const Data = packages.domain.domain;

  //     handleChange(Data, "subDomainName");
  //   };
  const dispatch = useDispatch();
  // console.log("subDomainName", owndomainName);

  const checkDomain = (condition) => async (e) => {
    // console.log("new condition====", condition);
    setDomainName(e.target.value);
    setDomainVal(false);
    setDomainErr(false);
    const sentence = e.target.value;
    const toLower = sentence.toLowerCase();

    const sentence1 = owndomainName;
    const toLower1 = sentence1.toLowerCase();

    // setSubDomain(toLower);

    let finalDomain = "";

    console.log("condition", condition);

    if (condition == "owndomain") {
      console.log("in cus dom");
      finalDomain = toLower;
    } else if ("wimosdomain") {
      finalDomain = toLower + "." + toLower1;
    }

    // const { values, handleChange, errorMessage, sucessMessage } = this.props;
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      baseURL: BaseUrl,
      withCredentials: true,
    });
    instance
      .get(
        "/store/check-domain?domain=" + finalDomain,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setDomainErr(false);
        if (condition === "owndomain") {
          setIsCustomDomain(true);
        }
        console.log("owndomainName", owndomainName);
        // setDomainName(e.target.value);
      })
      .catch((err) => {
        setDomainErr(true);
      });
  };

  const checkDomain2 = async (e) => {
    const sentence = e.target.value;
    const toLower = sentence.toLowerCase();

    const sentence1 = domainName;
    const toLower1 = sentence1.toLowerCase();
    console.log("toLower1", toLower1);
    //console.log("toLower", toLower);

    // const { values, handleChange, errorMessage, sucessMessage } = this.props;
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      baseURL: BaseUrl,
      withCredentials: true,
    });
    instance
      .get(
        "/store/check-domain?domain=" + toLower1 + "." + toLower,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setDomainErr(false);
        // console.log("response", response);
        setOwndomainName(e.target.value);
      })
      .catch((err) => {
        setDomainErr(true);
      });
  };

  // const addStore = async (e) => {
  //   e.preventDefault();
  //   const Data = {
  //     store_name: storeName,
  //     sub_domain: domainName,
  //     network: "etherium",
  //   };
  //   // dispatch(storeAction(Data, continues));
  // };

  // const continues = () => {
  //   // UpdateStep(2);
  //   nextStep();
  // };

  // back = (e) => {
  //   e.preventDefault();
  //   this.props.prevStep();
  // };

  return (
    <form>
      <label className="mb-1" htmlFor="val-email">
        <strong>Store Name*</strong>
      </label>
      <input
        className="form-control"
        placeholder="Enter Your Store Name"
        label="Store Name"
        value={storeName}
        onChange={(e) => {
          handleStore(e.target.value);
        }}
      />
      {storeVal ? <h6 style={{ color: "red" }}>Store Name is Required</h6> : ""}
      <br />

      {checked ? (
        <div className="row">
          <div className="col-sm-6">
            <label className="mb-1" htmlFor="val-email">
              <strong>Store Url*</strong>
            </label>
            <input
              className="form-control col-md-6"
              placeholder="Enter your store uri"
              label="Domain Name"
              // value={domainName}
              // onChange={(e) => {
              //   checkDomain(e);
              // }}
              onChange={checkDomain("wimosdomain")}
            />
            {domainErr ? (
              <p style={{ color: "red" }}>Domain name not available</p>
            ) : (
              ""
            )}
            {domainVal ? (
              <h6 style={{ color: "red" }}>Domain Name is Required</h6>
            ) : (
              ""
            )}
            <br />
          </div>{" "}
          <div className="col-sm-6">
            <label className="mb-1" htmlFor="val-email">
              <strong>Domain name</strong>
            </label>
            <div style={{ marginRight: "6px", display: "flex" }}>
              {/* <h4 style={{ marginTop: "1rem", marginRight: "6px" }}> .</h4> */}
              {checked ? (
                <input
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "1rem",
                    border: "0.0625rem solid #e4e4e",
                    height: "3.5rem",
                  }}
                  className="form-control"
                  // value={subDomainName}
                  placeholder=".wimos.io"
                  // defaultValue={subDomainName}
                  label="own sub store uri"
                  // onChange={(e) => {
                  //   setOwndomainName(e.target.value);
                  // }}
                  value=".wimos.io"
                  disabled
                  onChange={(e) => {
                    checkDomain2(e);
                  }}
                />
              ) : (
                <input
                  className="form-control"
                  // value={subDomainName}
                  placeholder=".wimos.io"
                  // defaultValue={subDomainName}
                  label="own sub store uri"
                  // onChange={(e) => {
                  //   setOwndomainName(e.target.value);
                  // }}

                  onChange={(e) => {
                    checkDomain2(e);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-sm-12">
          <label className="mb-1" htmlFor="val-email">
            <strong>Store Url*</strong>
          </label>
          <input
            className="form-control col-md-6"
            placeholder="Enter your store url"
            label="Domain Name"
            // value={domainName}
            // onChange={(e) => {
            //   checkDomain(e);
            // }}
            onChange={checkDomain("owndomain")}
          />
          {domainErr ? (
            <p style={{ color: "red" }}>Domain name not available</p>
          ) : (
            ""
          )}

          {domainVal ? (
            <h6 style={{ color: "red" }}>Domain Name is Required</h6>
          ) : (
            ""
          )}
          <br />
        </div>
      )}

      {checked ? (
        ""
      ) : (
        <span>
          If you use your own domain, please point to this IP: <b>52.40.2.14</b>
          <br />
          <br />
        </span>
      )}

      <label className="mb-1" htmlFor="val-email">
        <input
          type="checkbox"
          value="true"
          name="true"
          className="form-check-input"
          onChange={handleChecked2}
        />
        <div
          style={{
            marginTop: "2px",
            display: "inline-block",
            marginLeft: "3px",
          }}
        >
          {" "}
          Use custom domain
        </div>
      </label>
      <div className="form-group mb-4">
        {/* <label className="mb-1" htmlFor="val-email">
          <strong>Network*</strong>
        </label> */}
        <div className="row">
          <label className="mb-1" htmlFor="val-email">
            <br />
            <strong>Network*</strong>
          </label>

          <div className="col-md-4 col-lg-4 col-sm-4 ">
            <Card
              className="flyout"
              style={{ width: "100%", cursor: "pointer" }}
              defaultChecked
            >
              <input
                type="radio"
                name="product"
                className="card-input-element"
                defaultChecked
              />

              <div className="default card-input">
                <div className="heading" style={{ textAlign: "center" }}>
                  <img
                    src={Etherum}
                    style={{ width: "55%", height: "8.5rem" }}
                  ></img>
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Ethereum
                  </h5>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4">
            <Card
              className="flyout-poly"
              style={{
                width: "100%",
                cursor: "pointer",
                opacity: "43%",
                background: "#dddddd",
              }}
            >
              <input
                type="radio"
                name="product"
                className="card-input-element"
                disabled
              />
              <div className="default card-input">
                <div className="heading">
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={binance}
                      style={{ width: "33%", height: "8.5rem" }}
                    ></img>{" "}
                    <br />
                    Polygon
                  </h5>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4">
            <Card
              className="flyout-bia"
              style={{
                width: "100%",
                cursor: "pointer",
                opacity: "43%",
                background: "#dddddd",
              }}
            >
              <input
                type="radio"
                name="product"
                className="card-input-element"
                disabled
              />
              <div className="default card-input">
                <div className="heading">
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={polygon}
                      style={{ width: "33%", height: "8.5rem" }}
                    ></img>{" "}
                    <br />
                    Binance
                  </h5>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* <Select defaultValue={options[1]} options={options} /> */}
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    packages: state.packages.packages,
    storeId: state.auth.storeId,
  };
};
export default connect(mapStateToProps, {
  storeAction,
  packageAction,
})(CreateStore);
