import React, { Component } from "react";

import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

export class Confirm extends Component {
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
    const {
      values: {
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
      },
    } = this.props;
    return (
      <>
        <List>
          <ListItem>
            <ListItemText primary="First Name" secondary={firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={userName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="phone Number" secondary={phoneNumber} />
          </ListItem>
          <ListItem>
            <ListItemText primary="password" secondary={password} />
          </ListItem>
          <ListItem>
            <ListItemText primary="store Name" secondary={storeName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="domain Name" secondary={domainName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Country" secondary={CountryName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="code" secondary={CountryCode} />
          </ListItem>
          <ListItem>
            <ListItemText primary="MetaMask" secondary={MetaMask} />
          </ListItem>
          <ListItem>
            <ListItemText primary="VerifyCode" secondary={VerifyCode} />
          </ListItem>
        </List>

        <br />
        <Button color="secondary" variant="contained" onClick={this.back}>
          Back
        </Button>
        <Button color="primary" variant="contained" onClick={this.continue}>
          Confirm & Continue
        </Button>
      </>
    );
  }
}

export default Confirm;
