import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import WizardFormFirstPage from "./WizardFormFirstPage";
import WizardFormSecondPage from "./WizardFormSecondPage";
import WizardFormThirdPage from "./WizardFormThirdPage";
import WizardFormFourthPage from "./WizardFormFourthPage";
import WizardFormFifthPage from "./WizardFormFifthPage";
import WizardFormSixthPage from "./WizardFormSixthPage";
import WizardFormSevanPage from "./WizardFormSevanPage";
import WizardFormEightPage from "./WizardFormEightPage";
import WizardFormNinePage from "./WizardFormNinePage";
import WizardFormTenPage from "./WizardFormTenPage";

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <div className="">
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 4 && (
          <WizardFormFourthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 5 && (
          <WizardFormFifthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 6 && (
          <WizardFormSixthPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 7 && (
          <WizardFormSevanPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 8 && (
          <WizardFormEightPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 9 && (
          <WizardFormNinePage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 10 && (
          <WizardFormTenPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
    );
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: "name",
  userName: "userName",
  password: "password",
  email: "email",
  phone_number: "contactnumber",
  nationality: "countries",
  store_name: "storeName",
  domain_name: "domainName",
  wallet_id: "metaId",
  network: "Ethereum",
};

export default WizardForm;
