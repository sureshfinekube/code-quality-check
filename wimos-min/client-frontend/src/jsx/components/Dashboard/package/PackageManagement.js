import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import PageTitle from "../../../layouts/PageTitle";
import { withStyles } from "@material-ui/core/styles";
import {
  loadingToggleAction,
  packageAction,
  UpdatePackageAction,
} from "../../../../store/actions/packageAction";
import { StripePackageUpdationAction } from "../../../../store/actions/AuthActions";
import { Button, Col, Accordion, Card, Row } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import axios from "axios";
import Carousel from "./Carousel";

const PackageManagement = (props) => {
  const dispatch = useDispatch();
  const [packageId, setPackageId] = useState();
  const [checker, setChecker] = useState(false);
  // const [Data, setActiveAccordionHeaderBg] = useState(0);
  // const handleChange = (e) => {
  // console.log("eeeeeeeeeeee", packageId);

  //   const packageId = e.target.value;
  // };

  useEffect(() => {
    props.packageAction();
    // props.loadingToggleAction(true);
  }, []);

  const [isUpdatePackageLoading, setIsUpdatePackageLoading] = useState(false)

  const UpdatePackage = async (id, stripe_price_id) => {

    setIsUpdatePackageLoading(true) 

    //console.log("hellooomr");
    // CreateCustomer();
    // console.log("pckgeId", this.state.pckgeId);
    // const packages = props.packages.packages;
    const DataId = stripe_price_id;
    const PackId = id;
    // const DataId = "price_1L5jQ0SHKOjxED4BOLidNRda";
    // const PackId = "6296eeac887ef9dbfb379d9f";
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("c_wimos"),
      },
    });
    const Data = {
      packageId: PackId,
      stripe_price_id: DataId,
      return_domain: "https://portal.wimos.io/stripe-updation",
    };
    //return_domain: "https://portal.wimos.io/stripe-updation",

    if (props.packagestatus) {
      await instance
        .post("/payments/create-customer", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          //console.log("response", response.data);
        })
        .catch((err) => {
          console.log("err", err.response.data);
          // console.log("err", err);
        });
    }
    instance
      .put(
        "/payments/update-package",
        Data,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //console.log("response", response.data);
        window.location.replace(response.data.redirectionUrl);
        setIsUpdatePackageLoading(false) 
      })
      .catch((err) => {
        console.log("err", err.response.data);
        setIsUpdatePackageLoading(false) 
      });
  };
  const CustomTooltip = withStyles({
    tooltip: {
      color: "#fff",
      backgroundColor: "#bd1bb3b0",
      width: "200px",
      padding: "10px",
    },
  })(Tooltip);
  // const { packages } = props.packages;
  let Data = props.packages?.packages;

  useEffect(() => {
    if (Data) {
      setChecker(true);

      var fromIndex = getIndex(props.authdata.packageId, Data);
      // console.log(fromIndex);
      const toIndex = 0;

      const element = Data.splice(fromIndex, 1)[0];
      Data.splice(toIndex, 0, element);
    }
  }, [Data]);

  // console.log("Data", Data);
  // const arr = ['css', 'js', 'ts'];
  // console.log("cgvbhnjm", props.authdata.packageId);
  // const filtered = Data.filter((data) => {
  //   return data._id === props.authdata.packageId;
  // });

  function getIndex(value, arr) {
    // console.log("arr", arr);
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === value) {
          return i;
        }
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  if (props.packagestatus !== true) {
    Data = Data.filter((item) => item.amount > 0);
  }
  // console.log(Data);
  return (
    <>
      {/* <PageTitle activeMenu="Packages" motherMenu="Home" /> */}

      <Row className="justify-content-center align-self-center">
        <div className="container">
          <center>
            <h4>Packages</h4>
          </center>

          <div className="col-xl-12">
            <div className="row ">
              <div className="col-12">
                {checker && Data.length === 1 ? (
                  <div className="slides">
                    <div className="slide center">
                      <div className="top-boarder"></div>
                      <div>
                        {checker &&
                          Data &&
                          Data.map((item, index) => (
                            <>
                              <div key={index}>
                                {/* <input
                          type="radio"
                          name="optradio"
                          className="card-input-element"
                          cursor="pointer"
                        /> */}

                                <div className="panel panel-default card-input">
                                  {/* <div className="card-body user-profile">
                  <div className="media-body user-meta-info"> */}
                                  <div className="under-line">
                                    <h4 className=" package-name text-uppercase color-gray">
                                      <b>{item.name}</b>
                                    </h4>
                                    {/* <h3>
                            <b>$ {item.monthly_subscription_fee}/Mo</b>
                          </h3> */}
                                    <h1 className="color-gray">
                                      <b>
                                        $ {item.amount} <br />
                                      </b>
                                    </h1>
                                    <p>
                                      {" "}
                                      {item.type === "yearly_subscription" ? (
                                        <>Per Year</>
                                      ) : (
                                        <>Per Month</>
                                      )}
                                    </p>
                                  </div>
                                  <br />
                                  <div
                                    style={{
                                      fontSize: ".9rem",
                                      paddingLeft: "78px",
                                      paddingRight: "78px",
                                      textAlign: "left",
                                    }}
                                  >
                                    <p>
                                      {item.unlimited_user ? (
                                        <>
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#00bc35" }}
                                          ></i>
                                        </>
                                      ) : (
                                        <>
                                          <i
                                            className="far fa-times-circle"
                                            style={{ color: "red" }}
                                          ></i>
                                        </>
                                      )}{" "}
                                      Unlimited User
                                    </p>
                                    <p>
                                      {item.unlimited_collection ? (
                                        <>
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#00bc35" }}
                                          ></i>
                                        </>
                                      ) : (
                                        <>
                                          <i
                                            className="far fa-times-circle"
                                            style={{ color: "red" }}
                                          ></i>
                                        </>
                                      )}{" "}
                                      Unlimited Collections
                                    </p>
                                    <p>
                                      {item.unlimited_product ? (
                                        <>
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#00bc35" }}
                                          ></i>
                                        </>
                                      ) : (
                                        <>
                                          <i
                                            className="far fa-times-circle"
                                            style={{ color: "red" }}
                                          ></i>
                                        </>
                                      )}{" "}
                                      Unlimited NFT's
                                    </p>
                                  </div>
                                  <CustomTooltip
                                    title={
                                      <div style={{ fontSize: "12px" }}>
                                        {item.features.map((values, index) => (
                                          <p>{values.value}</p>
                                        ))}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <i
                                      className="fas fa-info-circle"
                                      style={{ color: "#bb3f96" }}
                                    >
                                      {" "}
                                      Features
                                    </i>
                                  </CustomTooltip>
                                  {/* <b>
                          {item.features.map((values, index) => (
                            <p>{values.value}</p>
                          ))}
                        </b> */}
                                  <p>{item.description}</p>
                                  {item._id == props.authdata.packageId ? (
                                    <div
                                      className="d-grid gap-2"
                                      style={{
                                        marginBottom: "15px",
                                      }}
                                    >
                                      <Button
                                        variant="outline-info"
                                        size="md"
                                        onClick={() =>
                                          UpdatePackage(
                                            item._id,
                                            item.stripe_price_id
                                          )
                                        }
                                        disabled
                                        style={{
                                          borderRadius: " 30px",
                                        }}
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          Current Package
                                        </span>
                                      </Button>
                                    </div>
                                  ) : (
                                    <div
                                      className="d-grid gap-2"
                                      style={{
                                        marginBottom: "15px",
                                      }}
                                    >
                                      <Button
                                        variant="primary"
                                        size="md"
                                        onClick={() =>
                                          UpdatePackage(
                                            item._id,
                                            item.stripe_price_id
                                          )
                                        }
                                        style={{
                                          borderRadius: " 30px",
                                        }}
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          Subscribe
                                        </span>
                                      </Button>
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                              {/* <div></div> */}
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {checker && (
                      <Carousel

                      // autoplay
                      // interval={5000}
                      //    status={item._id == props.authdata.packageId ? true : false}
                      >
                        {Data &&
                          Data.map((item, index) => (
                            <>
                              <div key={index}>
                                {/* <input
                          type="radio"
                          name="optradio"
                          className="card-input-element"
                          cursor="pointer"
                        /> */}

                                <div className="panel panel-default card-input">
                                  {/* <div className="card-body user-profile">
                  <div className="media-body user-meta-info"> */}
                                  <div className="under-line">
                                    <h4 className=" package-name text-uppercase color-gray">
                                      <b>{item.name}</b>
                                    </h4>
                                    {/* <h3>
                            <b>$ {item.monthly_subscription_fee}/Mo</b>
                          </h3> */}
                                    <h1 className="color-gray">
                                      <b>
                                        $ {item.amount} <br />
                                      </b>
                                    </h1>
                                    <p>
                                      {" "}
                                      {item.type === "yearly_subscription" ? (
                                        <>Per Year</>
                                      ) : (
                                        <>Per Month</>
                                      )}
                                    </p>
                                  </div>
                                  <br />
                                  <div
                                    style={{
                                      fontSize: ".9rem",
                                      paddingLeft: "78px",
                                      paddingRight: "78px",
                                      textAlign: "left",
                                    }}
                                  >
                                    <p>
                                      {item.unlimited_user ? (
                                        <>
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#00bc35" }}
                                          ></i>
                                        </>
                                      ) : (
                                        <>
                                          <i
                                            className="far fa-times-circle"
                                            style={{ color: "red" }}
                                          ></i>
                                        </>
                                      )}{" "}
                                      Unlimited User
                                    </p>
                                    <p>
                                      {item.unlimited_collection ? (
                                        <>
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#00bc35" }}
                                          ></i>
                                        </>
                                      ) : (
                                        <>
                                          <i
                                            className="far fa-times-circle"
                                            style={{ color: "red" }}
                                          ></i>
                                        </>
                                      )}{" "}
                                      Unlimited Collections
                                    </p>
                                    <p>
                                      {item.unlimited_product ? (
                                        <>
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#00bc35" }}
                                          ></i>
                                        </>
                                      ) : (
                                        <>
                                          <i
                                            className="far fa-times-circle"
                                            style={{ color: "red" }}
                                          ></i>
                                        </>
                                      )}{" "}
                                      Unlimited NFT's
                                    </p>
                                  </div>
                                  <CustomTooltip
                                    title={
                                      <div style={{ fontSize: "12px" }}>
                                        {item.features.map((values, index) => (
                                          <p>{values.value}</p>
                                        ))}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <i
                                      className="fas fa-info-circle"
                                      style={{ color: "#bb3f96" }}
                                    >
                                      {" "}
                                      Features
                                    </i>
                                  </CustomTooltip>
                                  {/* <b>
                          {item.features.map((values, index) => (
                            <p>{values.value}</p>
                          ))}
                        </b> */}
                                  <p>{item.description}</p>
                                  {item._id == props.authdata.packageId ? (
                                    <div
                                      className="d-grid gap-2"
                                      style={{
                                        marginBottom: "15px",
                                      }}
                                    >
                                      <Button
                                        variant="outline-info"
                                        size="md"
                                        onClick={() =>
                                          UpdatePackage(
                                            item._id,
                                            item.stripe_price_id
                                          )
                                        }
                                        disabled
                                        style={{
                                          borderRadius: " 30px",
                                        }}
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          Current Package
                                        </span>
                                      </Button>
                                    </div>
                                  ) : (
                                    <div
                                      className="d-grid gap-2"
                                      style={{
                                        marginBottom: "15px",
                                      }}
                                    >
                                      {!isUpdatePackageLoading ? 
                                      <Button
                                        variant="primary"
                                        size="md"
                                        onClick={() =>
                                          UpdatePackage(
                                            item._id,
                                            item.stripe_price_id
                                          )
                                        }
                                        style={{
                                          borderRadius: " 30px",
                                        }}
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          Subscribe
                                        </span>
                                      </Button>
                                      :
                                      <Button
                                        variant="primary"
                                        size="md"
                                        style={{
                                          borderRadius: " 30px",
                                        }}
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          Subscribe
                                        </span>
                                      </Button>
                                    }
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                              {/* <div></div> */}
                            </>
                          ))}
                      </Carousel>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    packages: state.packages.packages,
    authdata: state.auth.auth,
    packagestatus: state.auth.auth.isFreePackageClient,
  };
};
export default connect(mapStateToProps, { packageAction })(PackageManagement);
