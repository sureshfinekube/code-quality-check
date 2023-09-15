import React, { Component, useState } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { selectPackageAction } from "../../../../../store/actions/AuthActions";
import swal from "sweetalert";
import failed from "../../../../../images/swal-error.png";

// import { UpdateStep } from "../../../../services/AuthService";
import axios from "axios";

function PackageSelect({ nextStep, prevStep, sid, packages }) {
  //   constructor(props) {
  //     super(props);
  //     this.state = { pckgeId: "" };
  //     this.handleChange = this.handleChange.bind(this);
  //   }
  const [pckgeId, setPckgeId] = useState("");

  // const continues = () => {
  //   // e.preventDefault();
  //   // UpdateStep(5);
  //   nextStep();
  // };
  // const back = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };

  const handlePackage = (e) => {
    let Data = {
      storeId: sid,
      packageId: e.target.value,
    };
    selectPackageAction(Data);
  };

  const handleChange = (e) => {
    // console.log("pckgeId", e.target.value);
    setPckgeId(e.target.value);
  };
  const [loader, SetLoader] = useState(false);

  const ChekOutApi = async () => {
    SetLoader(true);

    // CreateCustomer();
    // console.log("pckgeId", this.state.pckgeId);
    // const { packages } = this.props;
    // console.log("packagessss", packages);

    if (pckgeId === "") {
      swal("Oops", "Please Select a plan", {
        icon: failed,
        buttons: {
          cancel: "Try Again!",
        },
      });
    } else {
      const DataId = packages.packages[pckgeId].stripe_price_id;
      const PackId = packages.packages[pckgeId]._id;
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
        return_domain: "https://portal.wimos.io/stripe-success",
      };
      //console.log("Datacheckout", Data);
      await instance
        .post("/payments/create-customer", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((err) => {
          console.log("err", err.response.data);
          // console.log("err", err);
        });
      instance
        .post(
          "/payments/checkout",
          Data,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // console.log("response", response.data);
          window.location.replace(response.data.redirectionUrl);

          // sucessMessage("response");

          //console.log("dn", values.domainName);
        })
        .catch((err) => {
          console.log("err", err.response.data);
          // console.log("err", err);
        });
    }
  };

  const CustomTooltip = withStyles({
    tooltip: {
      color: "#fff",
      backgroundColor: "#bd1bb3b0",
      width: "200px",
      padding: "10px",
    },
  })(Tooltip);
  //   render() {
  //     const { packages } = this.props;
  // console.log("packages", packages);
  const Data = packages.packages;
  return (
    <>
      {" "}
      <Row className="justify-content-center align-self-center">
        <div className="container">
          <center>
            <h4>Select Your Package</h4>
          </center>

          <div className="col-xl-12">
            <div className="row package-scroll">
              {Data &&
                Data.map((item, index) => (
                  <div className="col-md-7 col-lg-6 col-sm-4" key={index}>
                    <label>
                      <div
                        className="card contact-bx "
                        style={{ width: "18rem" }}
                      >
                        <input
                          type="radio"
                          name="optradio"
                          value={index}
                          className="card-input-element"
                          cursor="pointer"
                          onChange={handleChange}
                        />

                        <div className="panel panel-default card-input">
                          {/* <div className="card-body user-profile">
                        <div className="media-body user-meta-info"> */}
                          <h4 className="package-name text-uppercase">
                            <b>{item.name}</b>
                          </h4>

                          <h3>
                            <b>
                              $ {item.amount}{" "}
                              {item.type === "yearly_subscription" ? (
                                <>/Year</>
                              ) : (
                                <>/Month</>
                              )}
                            </b>
                          </h3>
                          <div
                            style={{
                              fontSize: ".9rem",
                              paddingLeft: "48px",
                              paddingRight: "25px",
                              textAlign: "left",
                            }}
                          >
                            <p>
                              {item.unlimited_store ? (
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
                              Unlimited Stores
                            </p>
                            <p>
                              {item.unlimited_page ? (
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
                              Unlimited Pages
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

                          {/* <Tooltip
                            title={
                              <div style={{ fontSize: "12px" }}>
                                {item.features.map((values, index) => (
                                  <p>{values}</p>
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
                          </Tooltip> */}

                          {/* <b>
                                {item.features.map((values, index) => (
                                  <p>{values.value}</p>
                                ))}
                              </b> */}

                          <p>{item.description}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <br />
      </Row>
      {pckgeId === "" ? (
        <button
          id="checkout-and-portal-button"
          type="submit"
          className="btn btn-info w-100"
          disabled={true}
        >
          Checkout
        </button>
      ) : pckgeId !== "" && !loader ? (
        <button
          id="checkout-and-portal-button"
          type="submit"
          className="btn btn-info w-100"
          onClick={ChekOutApi}
        >
          Checkout
        </button>
      ) : (
        <button
          id="checkout-and-portal-button"
          type="submit"
          className="btn btn-info w-100"
          style={{ width: "100px" }}
        >
          <i className="fa fa-spinner fa-spin" style={{ fontSize: "24px" }}></i>
        </button>
      )}
      {/* <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={this.back}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={this.handlePackage}
        >
          Next
        </button> */}
    </>
  );
}

// export default ;
const mapStateToProps = (state) => {
  return {
    packages: state.packages.packages,
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { selectPackageAction })(PackageSelect);
