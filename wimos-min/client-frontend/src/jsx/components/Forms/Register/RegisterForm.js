import React, { Component } from "react";
import Confirm from "./Confirm";
import Success from "./Success";
import UserName from "./UserName";
import VerifyOtp from "./VerifyOtp";
import CreateStore from "./CreateStore";
import MetamaskCon from "./MetamaskCon";
import SelectContractType from "./SelectContractType";
import PackageSelect from "./PackageSelect";
import Payment from "./Payment";
import UserDetails from "./UserDetails";
import CreateContract from "./CreateContract";
import Subs from "./Subscription";
import { connect } from "react-redux";
import { selectPackageAction } from "../../../../store/actions/AuthActions";

export class RegsiterForm extends Component {
  state = {
    step: 1,
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    storeName: "",
    domainName: "",
    CountryName: "",
    CountryCode: "",
    tokenId: "",
    errMsg: "",
    subDomainName: "",
    pckgeId: "",
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  jumpStep = (jumpstep) => {
    const { step } = this.state;
    this.setState({
      step: jumpstep + 3,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };
  componentDidMount = () => {
    if (!this.props.AuthData) {
      this.setState({
        step: 7,
      });
    }
  };

  handleChange = (e, value) => {
    // console.log("arrived here: ", e);
    this.setState({ [value]: e });
  };
  errorMessage = (value) => {
    // console.log("arrived here: ", e);
    this.setState({ [value]: true });
  };
  sucessMessage = (value) => {
    // console.log("arrived here: ", e);
    this.setState({ [value]: false });
  };
  render() {
    const { step } = this.state;
    const {
      firstName,
      userName,
      email,
      phoneNumber,
      password,
      storeName,
      domainName,
      CountryName,
      CountryCode,
      MetaMask,
      VerifyCode,
      tokenId,
      storeId,
      errMsg,
      subDomainName,
      packageData,
      storedId,
      pckgeId,
    } = this.state;
    const values = {
      firstName,
      userName,
      email,
      phoneNumber,
      password,
      storeName,
      domainName,
      storeId,
      CountryName,
      CountryCode,
      MetaMask,
      VerifyCode,
      tokenId,
      errMsg,
      subDomainName,
      packageData,
      storedId,
      pckgeId,
    };

    switch (step) {
      case 1:
        return (
          <UserName
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <UserDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <VerifyOtp
            nextStep={this.nextStep}
            jumpStep={this.jumpStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <CreateStore
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            errorMessage={this.errorMessage}
            sucessMessage={this.sucessMessage}
            values={values}
          />
        );
      // case 5:
      //   return (
      //     <MetamaskCon
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       values={values}
      //     />
      //   );
      // case 6:
      //   return (
      //     <PageFive
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       values={values}
      //     />
      //   );
      case 5:
        return (
          <CreateContract
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 6:
        return (
          <MetamaskCon
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 7:
        return (
          <Subs
            // nextStep={this.nextStep}
            // prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      // case 8:
      //   return (
      //     <StripeSuccess
      //       // nextStep={this.nextStep}
      //       // prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       values={values}
      //     />
      //   );
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

const mapStateToProps = (state) => {
  return {
    AuthData: state.auth,
    // StripePriceId: state.register.packages.packages.stripe_price_id,
  };
};
export default connect(mapStateToProps)(RegsiterForm);
