import React, { Component } from "react";
import { Card } from "react-bootstrap";
import StepEight from "./StripPayment.js/StepEight";
import { UpdateStep } from "../../../../services/AuthService";
import Subs from "./Subscription";
// import HandlerSubs from "./Subscription/Main";

export class Payment extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { paymentCompleted: setPaymentCompleted };
  //

  continue = (e) => {
    e.preventDefault();
    UpdateStep(6);
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <>
        <StepEight />
        {/* <Subs /> */}
        {/* <HandlerSubs /> */}

        <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={this.back}
        >
          Back
        </button>
        {/* <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={this.continue}
        >
          Continue
        </button> */}
      </>
    );
  }
}

export default Payment;
