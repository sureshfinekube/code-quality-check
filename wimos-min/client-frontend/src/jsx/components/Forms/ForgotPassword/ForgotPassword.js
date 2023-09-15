import React, { Component } from "react";
import Email from "./Email";
import ChangePassword from "./ChangePassword";
import { connect } from "react-redux";
//import { ChangePassword } from "../../../../services/AuthService";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    step: 1,
    email: "",
    password: "",
    confirmPass: "",
    otp: "",
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //   jumpStep = (jumpstep) => {
  //     const { step } = this.state;
  //     this.setState({
  //       step: jumpstep + 3,
  //     });
  //   };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };
  //   componentDidMount = () => {
  //     if (!this.props.AuthData) {
  //       this.setState({
  //         step: 7,
  //       });
  //     }
  //   };

  handleChange = (e, value) => {
    //console.log("arrived here c: ", e);
    this.setState({ [value]: e });
  };
  errorMessage = (value, e) => {
    // console.log("arrived here e: ", e);
    this.setState({ [value]: true });
  };
  sucessMessage = (value, e) => {
    //console.log("arrived here s: ", e);
    this.setState({ [value]: false });
  };
  render() {
    const { step } = this.state;
    const { email, password, confirmPass, otp } = this.state;
    const values = {
      email,
      password,
      confirmPass,
      otp,
    };
    //console.log("history", this.props.history);
    switch (step) {
      case 1:
        return (
          <Email
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            history={this.props.history}
          />
        );
      case 2:
        return (
          <ChangePassword
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            history={this.props.history}
            values={values}
          />
        );

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
export default connect(mapStateToProps)(ForgotPassword);
