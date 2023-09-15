import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PackagesController from "./packages";
import ClientDetails from "./clientdetails";
import DomainDetails from "./domains";
import StoreDetails from "./storedetails";
import Features from "./features";
import AddFeature from "./addfeature";
import CustomerDetails from "./customers";
import ClientView from "./clientview";
import ContractDetails from "./contract";
import ContractView from "./contractfeatures";

function index({ match }) {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/packages`} />
        <Route
          path={`${match.url}/packages`}
          render={(props) => <PackagesController {...props} />}
        />
        <Route
          path={`${match.url}/clients`}
          render={(props) => <ClientDetails {...props} />}
        />
        <Route
          path={`${match.url}/domains`}
          render={(props) => <DomainDetails {...props} />}
        />
        <Route
          path={`${match.url}/features`}
          render={(props) => <Features {...props} />}
        />

        <Route
          path={`${match.url}/addfeature`}
          render={(props) => <AddFeature {...props} />}
        />
        <Route
          path={`${match.url}/stores`}
          render={(props) => <StoreDetails {...props} />}
        />
        <Route
          path={`${match.url}/customers`}
          render={(props) => <CustomerDetails {...props} />}
        />
        <Route
          path={`${match.url}/client-:id`}
          render={(props) => <ClientView {...props} />}
        />
        <Route
          path={`${match.url}/contracts`}
          render={(props) => <ContractDetails {...props} />}
        />
        <Route
          path={`${match.url}/contracts-:id`}
          render={(props) => <ContractView {...props} />}
        />

        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
}

export default index;
