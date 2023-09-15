import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { connect } from "react-redux";
import {
  storeAction,
  // domainAction,
} from "../../../../store/actions/AuthActions";
import { packageAction } from "../../../../store/actions/packageAction";
import { UpdateStep } from "../../../../services/AuthService";
export class CreateStore extends Component {
  constructor(props) {
    super(props);
    this.state = { errorDomain: false, subDomainName: "" };
  }
  //= async () => {
  Validatation = () => {
    if (!this.state.values.storeName) {
      this.state.errors.storeName = (
        <h6 style={{ color: "red" }}>store Name Required</h6>
      );
    }
  };

  componentDidMount = async () => {
    //e.preventDefault();
    const { handleChange, packages } = this.props;
    this.props.packageAction();
    // const { values, packages } = this.props;
    const Data = packages.domain.domain;

    handleChange(Data, "subDomainName");
  };

  checkDomain = async (e) => {
    // e.preventDefault();
    const { values, handleChange, errorMessage, sucessMessage } = this.props;
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
    });
    instance
      .get(
        "/store/check-domain?domain=" + e.target.value,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        sucessMessage("errMsg");
        handleChange(e.target.value, "domainName");
        //console.log("dn", values.domainName);
      })
      .catch((err) => {
        errorMessage("errMsg");
      });
  };

  addStore = async (e) => {
    e.preventDefault();
    const { values, handleChange } = this.props;
    const Data = {
      store_name: values.storeName,
      sub_domain: values.domainName,
      network: "etherium",
      // client_id: this.props.authdata,
    };
    this.props.storeAction(Data, this.continue);
  };

  // addStore = async (e) => {
  //   e.preventDefault();
  //   // console.log("e", e);

  //   const { values, handleChange } = this.props;

  //   const data = {
  //     store_name: values.storeName,
  //     sub_domain: values.domainName,
  //     network: "etherium",
  //     client_id: values.tokenId,
  //   };

  //   axios
  //     .post("http://www.communiqo123.ml/api/store/create", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       handleChange(response.data.data.id, "storeId");
  //     })

  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  //   this.continue();
  // };

  continue = () => {
    // console.log("eyegd", this.props.storeId);
    // if (this.props.storeId.status) {
    UpdateStep(2);
    this.props.nextStep();
    //}
  };

  // back = (e) => {
  //   e.preventDefault();
  //   this.props.prevStep();
  // };

  render() {
    const { values, handleChange } = this.props;
    const options = [{ value: "Ethereum", label: "Ethereum" }];
    // console.log(this.state.errorDomain);
    return (
      <form>
        <label className="mb-1" htmlFor="val-email">
          <strong>Store Name *</strong>
        </label>
        <input
          className="form-control"
          placeholder="Enter Your Store Name"
          label="Store Name"
          // onChange={handleChange("storeName")}
          onChange={(e) => {
            handleChange(e.target.value, "storeName");
          }}
          defaultValue={values.storeName}
        />
        <br />
        <div className="row">
          <div className="col-sm-7">
            <label className="mb-1" htmlFor="val-email">
              <strong>Domain Name *</strong>
            </label>
            <input
              className="form-control col-md-6"
              placeholder="Enter Your Domain Name"
              label="Domain Name"
              // onChange={handleChange("domainName")}
              onChange={(e) => {
                this.checkDomain(e);
              }}
              defaultValue={values.domainName}
            />
            {values.errMsg ? <p color="red">Domain name not available</p> : ""}
            <br />
          </div>{" "}
          <div className="col-sm-5">
            <label className="mb-1" htmlFor="val-email">
              {/* <strong>Domain Name *</strong> */}
            </label>
            {/* <input
              className="form-control col-md-6"
              label="text"
              disabled
              // onChange={handleChange(".domainname")}
              // defaultValue={values.domainname}
            >
            </input> */}
            <br />
            <br />
            <label>
              <b> {values.subDomainName}</b>
            </label>

            <br />
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="val-email">
            <strong>Network *</strong>
          </label>
          <Select defaultValue={options[1]} options={options} />
        </div>
        {/* <button
          className="btn btn-primary ms-1"
          variant="contained"
          onClick={this.back}
        >
          Back
        </button> */}
        <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={this.addStore}
        >
          Next
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // domain: state.register.packages.domain,
    packages: state.packages.packages,
    storeId: state.auth.storeId,
  };
};
export default connect(mapStateToProps, {
  storeAction,
  // domainAction,
  packageAction,
})(CreateStore);
