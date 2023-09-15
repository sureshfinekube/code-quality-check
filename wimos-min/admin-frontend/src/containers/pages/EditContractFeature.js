import React, { useEffect, useState } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  Row,
  Form,
} from "reactstrap";

import { SliderTooltip, RangeTooltip } from "components/common/SliderTooltips";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
// import { createPackageAction } from 'redux/actions';
import { connect } from "react-redux";
import {
  updateContractFeatureAction,
  getContractFeaturesAction,
} from "../../redux/adminData/actions";

const EditContractFeatureModal = ({
  modalOpen,
  edittoggleModal,
  onUpdateContractFeatures,
  updateContractFeaturesErr,
  updateContractFeaturesSuccess,
  contractname,
  updateContractFeatureAction,
  getContractFeaturesAction,
  data,
}) => {
  // console.log("nhu", data.name);
  const [featureName, setFeatureName] = useState("");
  const [featurePrice, setFeaturePrice] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");
  // console.log("fea", featureName);
  useEffect(() => {
    setFeatureName(data?.name);
    setFeaturePrice(data?.amount);
    setFeatureDescription(data?.description);
  }, [data]);
  const [erroeMsg, setErrorMsg] = useState({ status: false, error: "" });

  useEffect(() => {
    if (updateContractFeaturesSuccess === true) {
      edittoggleModal();
      resetForm();
      getContractFeaturesAction();
      NotificationManager.success(
        "Success",
        "Feature Updated in Contract",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updateContractFeaturesSuccess]);

  const resetForm = () => {
    setFeatureName("");
    setFeatureDescription("");
    setFeaturePrice("");
  };

  // const validateForm = () => {

  //   let validated = handleInputChange("all");
  //   if (validated) {
  //     let data = { packageName, monthlySubscriptionFee, yearlySubscriptionFee, features, productLimitType, productLimitValue, description, status, banner: "" };
  //     createPackageAction(data);
  //   }
  // };

  // const featureAddController = () => {
  //   setFeatures([...features, { value: "" }]);
  // };

  //   const regex = new RegExp(
  //     "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$"
  //   );

  const validateFeatures = (featureName, featurePrice, featureDescription) => {
    if (featureName == "") {
      setErrorMsg({ status: true, error: "Please enter name" });
    } else if (featurePrice == "") {
      setErrorMsg({ status: true, error: "Please enter price" });
    } else if (featureDescription == "") {
      setErrorMsg({ status: true, error: "Please enter description" });
    } else {
      const Data = {
        id: data._id,
        name: featureName,
        description: featureDescription,
        amount: featurePrice,
        type: contractname,
      };
      //console.log(Data);
      setErrorMsg({ status: false, error: "" });
      updateContractFeatureAction(Data);
    }
  };

  const editFeatureHandler = () => {
    validateFeatures(featureName, featurePrice, featureDescription);
  };

  return (
    <Form>
      <Modal
        isOpen={modalOpen}
        toggle={edittoggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={edittoggleModal}>Edit Feature</ModalHeader>
        <ModalBody>
          <Label>Feature Name</Label>
          {/* {formErrs.packageName && <><br /><span className='text-danger'>{formErrs.packageName}</span></>} */}
          <Input
            //className={formErrs.packageName.length > 0 ? 'border-danger' : ""}
            name="Feature Name"
            placeholder="Enter Feature Name"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          />
          <br />
          <Label>Description</Label>

          <Input
            //className={formErrs.packageName.length > 0 ? 'border-danger' : ""}
            name=" Description"
            placeholder="Enter Description"
            value={featureDescription}
            onChange={(e) => setFeatureDescription(e.target.value)}
          />
          <br />
          <Label>Amount</Label>

          <Input
            //className={formErrs.packageName.length > 0 ? 'border-danger' : ""}
            name=" Amount"
            placeholder="Enter Amount"
            value={featurePrice}
            onChange={(e) => setFeaturePrice(e.target.value)}
          />
          <br />

          {erroeMsg.status && <p className="alert-danger">{erroeMsg.error}</p>}
          <Button
            onClick={() => editFeatureHandler()}
            className="mt-2"
            value="Add New"
          >
            Done
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={edittoggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>

          {/* {!onCreatePackage ? (
            <Button type="submit" color="primary" onClick={formSubmitHandler}>
              <IntlMessages id="pages.submit" />
            </Button>
          ) : (
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state  ${
                onCreatePackage ? "show-spinner" : ""
              }`}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="pages.submit" />
              </span>
            </Button>
          )} */}
        </ModalFooter>
      </Modal>
    </Form>
  );
};
const mapStateToProps = ({ adminData }) => {
  const {
    onUpdateContractFeatures,
    updateContractFeaturesErr,
    updateContractFeaturesSuccess,
  } = adminData;
  return {
    onUpdateContractFeatures,
    updateContractFeaturesErr,
    updateContractFeaturesSuccess,
  };
};

export default connect(mapStateToProps, {
  updateContractFeatureAction,
  getContractFeaturesAction,
})(EditContractFeatureModal);
