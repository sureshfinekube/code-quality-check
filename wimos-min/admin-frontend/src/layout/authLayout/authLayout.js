import React, { useEffect, useState } from "react";
import { VerifyAdminLogin } from "utils/axios/requestHandler";
import { useHistory } from "react-router-dom";
import LoadingComponent from "../../components/loadingComponent/index";
import {
  getAdminInsightAction,
  getClientAction,
  getPackageAction,
  updatePackageAction,
  updatePackageStatusAction,
  getDomainAction,
  getStoreAction,
  getDashboardAction,
  getContractFeaturesAction,
  getContractFeeAction,
} from "redux/actions";
import { connect } from "react-redux";
import { NotificationManager } from "components/common/react-notifications";

function AuthLayout({
  children,
  getPackageAction,
  onPackagesFetch,
  packagesFetchErr,
  packagesFetchSuccess,
  packages,
  onUpdatePackageStatus,
  updatePackageStatusErr,
  updatePackageStatusSuccess,
  updatePackageStatusId,
  createPackageErr,
  createPackageSuccess,
  updatePackageId,
  updatePackageErr,
  updatePackageSuccess,
  updatedPackage,
  getAdminInsightAction,
  getDashboardAction,
  getClientAction,
  updateClientErr,
  updateClientSuccess,
  clients,
  updatedClientID,
  getDomainAction,
  getStoreAction,
  updateStoreErr,
  updateStoreSuccess,
  updatedStoreID,
  stores,
  getContractFeaturesAction,
  getContractFeeAction,
}) {
  const history = useHistory();

  const [checkAuth, setCheckAuth] = useState();

  useEffect(() => {
    VerifyAdminLogin()
      .then(({ status }) => {
        !status && setCheckAuth(false);

        if (status) {
          setCheckAuth(true);
          getPackageAction();
          getClientAction();
          getDomainAction();
          getStoreAction();
          getAdminInsightAction();
          getDashboardAction();
          getContractFeaturesAction();
          getContractFeeAction();
        }
      })
      .catch((err) => setCheckAuth(false));
  }, []);

  useEffect(() => {
    if (updatePackageStatusSuccess) {
      NotificationManager.success(
        updatePackageStatusSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );

      let item = packages.find((elem) => {
        if (elem._id == updatePackageStatusId) return elem;
      });

      item.status = !item.status;
    }
  }, [updatePackageStatusSuccess]);

  useEffect(() => {
    if (updatePackageStatusErr) {
      NotificationManager.warning(
        updatePackageStatusErr,
        "Failed",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updatePackageStatusErr]);

  useEffect(() => {
    if (createPackageErr !== null)
      NotificationManager.warning(
        createPackageErr,
        "Fail",
        3000,
        null,
        null,
        ""
      );
  }, [createPackageErr]);

  useEffect(() => {
    if (createPackageSuccess !== null) {
      NotificationManager.success(
        createPackageSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
    }
  }, [createPackageSuccess]);

  useEffect(() => {
    if (updatePackageSuccess && updatedPackage) {
      NotificationManager.success(
        updatePackageSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      let item = packages.findIndex((elem) => {
        if (elem._id == updatePackageId) return elem;
      });

      packages[item] = updatedPackage;
    }
  }, [updatePackageSuccess]);

  useEffect(() => {
    if (updatePackageErr) {
      NotificationManager.warning(
        updatePackageErr,
        "Failed",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updatePackageErr]);

  useEffect(() => {
    // console.log("stst", updateClientSuccess);
    if (updateClientSuccess) {
      NotificationManager.success(
        "Status Updated",
        "Success",
        3000,
        null,
        null,
        ""
      );
      let item = clients.find((elem) => {
        if (elem.id == updatedClientID) return elem;
      });
      item.status = !item.status;
    }
  }, [updateClientSuccess]);

  useEffect(() => {
    if (updateClientErr) {
      NotificationManager.warning(
        updateClientErr,
        "Failed",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updateClientErr]);

  useEffect(() => {
    if (updateStoreSuccess) {
      NotificationManager.success(
        "Store updated successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      getStoreAction();
      // let item = stores.find((elem) => {
      //   if (elem._id == updatedStoreID) return elem;
      // });

      // item.status = !item.status;
    }
  }, [updateStoreSuccess]);

  useEffect(() => {
    if (updateStoreErr) {
      NotificationManager.warning(
        updateStoreErr,
        "Failed",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updateStoreErr]);

  const goToLoginPage = () => {
    history.push("/auth/login");
  };

  return (
    <React.Fragment>
      {checkAuth === undefined ? (
        <LoadingComponent />
      ) : checkAuth === true ? (
        children
      ) : (
        goToLoginPage()
      )}
    </React.Fragment>
  );
}

const mapStateToProps = ({ adminData }) => {
  const {
    onPackagesFetch,
    packagesFetchErr,
    packagesFetchSuccess,
    packages,
    onUpdatePackageStatus,
    updatePackageStatusErr,
    updatePackageStatusSuccess,
    updatePackageStatusId,
    createPackageErr,
    createPackageSuccess,
    updatePackageId,
    updatePackageErr,
    updatePackageSuccess,
    updatedPackage,
    updateClientErr,
    updateClientSuccess,
    clients,
    updatedClientID,
    updateStoreErr,
    updateStoreSuccess,
    updatedStoreID,
    stores,
  } = adminData;

  return {
    onPackagesFetch,
    packagesFetchErr,
    packagesFetchSuccess,
    packages,
    onUpdatePackageStatus,
    updatePackageStatusErr,
    updatePackageStatusSuccess,
    updatePackageStatusId,
    createPackageErr,
    createPackageSuccess,
    updatePackageId,
    updatePackageErr,
    updatePackageSuccess,
    updatedPackage,
    updateClientSuccess,
    updateClientErr,
    clients,
    updatedClientID,
    updateStoreErr,
    updateStoreSuccess,
    updatedStoreID,
    stores,
  };
};

export default connect(mapStateToProps, {
  getPackageAction,
  updatePackageStatusAction,
  updatePackageAction,
  getClientAction,
  getAdminInsightAction,
  getDomainAction,
  getStoreAction,
  getDashboardAction,
  getContractFeaturesAction,
  getContractFeeAction,
})(AuthLayout);
