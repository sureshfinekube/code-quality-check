import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { selectPackageAction } from "../../../../store/actions/AuthActions";
import { UpdateStep } from "../../../../services/AuthService";
import axios from "axios";

export class PackageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { pckgeId: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  continue = (e) => {
    // e.preventDefault();
    UpdateStep(5);
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handlePackage = (e) => {
    const { values, handleChange } = this.props;
    // values.storedId
    let Data = {
      storeId: this.props.sid,
      packageId: e.target.value,
    };
    this.props.selectPackageAction(Data, this.continue);
  };

  handleChange(e) {
    // console.log("pckgeId", e.target.value);
    this.setState({ pckgeId: e.target.value });
  }

  ChekOutApi = () => {
    // CreateCustomer();
    // console.log("pckgeId", this.state.pckgeId);
    const { packages } = this.props;
    const DataId = packages.packages[this.state.pckgeId].stripe_price_id;
    const PackId = packages.packages[this.state.pckgeId]._id;
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
    });
    const Data = {
      packageId: PackId,
      stripe_price_id: DataId,
      return_domain: "http://localhost:3001/stripe-success",
    };
    // console.log("Datacheckout", Data);
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
        // console.log("err", err.response.data);
        // console.log("err", err);
      });
  };
  render() {
    const { packages } = this.props;
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
                            onChange={this.handleChange}
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

                            <Tooltip
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
                            </Tooltip>

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
        <button
          id="checkout-and-portal-button"
          type="submit"
          className="btn btn-info w-100"
          onClick={this.ChekOutApi}
        >
          Checkout
        </button>
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
}

// export default ;
const mapStateToProps = (state) => {
  return {
    packages: state.packages.packages,
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { selectPackageAction })(PackageSelect);
