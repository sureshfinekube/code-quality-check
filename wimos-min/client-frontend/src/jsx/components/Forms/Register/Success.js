import React, { Component } from "react";

export class Success extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <>
        <h1>Thank You For Your Submission</h1>
        <p>You will get an email with further instructions.</p>
      </>
    );
  }
}

export default Success;
