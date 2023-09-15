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

// import Select from 'react-select';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
// import { createPackageAction } from 'redux/actions';
import { connect } from "react-redux";
import {
  addContractFeatureAction,
  getContractFeaturesAction,
} from "../../redux/adminData/actions";

const AddContractFeatureModal = ({
  modalOpen,
  toggleModal,
  onAddContractFeature,
  addContractFeatureErr,
  addContractFeatureSuccess,
  contractname,
  addContractFeatureAction,
  getContractFeaturesAction,
}) => {
  const [featureName, setFeatureName] = useState("");
  const [featurePrice, setFeaturePrice] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");
  // const [description, setDescription] = useState('');
  // const [productLimitType, setProductLimitType] = useState('');
  // const [status, setStatus] = useState();
  // const [monthlySubscriptionFee, setMonthlySubscriptionFee] = useState('');
  // const [yearlySubscriptionFee, setYearlySubscriptionFee] = useState('');
  // const [productLimited, setProductLimited] = useState(false);
  // const [productLimitValue, setProductLimitValue] = useState(0);
  const [erroeMsg, setErrorMsg] = useState({ status: false, error: "" });

  useEffect(() => {
    if (addContractFeatureSuccess === true) {
      toggleModal();
      resetForm();
      getContractFeaturesAction();
      NotificationManager.success(
        "Success",
        "Feature Added in Contract",
        3000,
        null,
        null,
        ""
      );
    }
  }, [addContractFeatureSuccess]);

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
        name: featureName,
        description: featureDescription,
        amount: featurePrice,
        type: contractname,
      };
      console.log(Data);
      setErrorMsg({ status: false, error: "" });
      addContractFeatureAction(Data);
    }
  };

  const addFeatureHandler = () => {
    validateFeatures(featureName, featurePrice, featureDescription);
  };

  return (
    <Form>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Add New Feature</ModalHeader>
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
            onClick={() => addFeatureHandler()}
            className="mt-2"
            value="Add New"
          >
            Add New +
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
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
    onAddContractFeature,
    addContractFeatureErr,
    addContractFeatureSuccess,
  } = adminData;
  return {
    onAddContractFeature,
    addContractFeatureErr,
    addContractFeatureSuccess,
  };
};

export default connect(mapStateToProps, {
  addContractFeatureAction,
  getContractFeaturesAction,
})(AddContractFeatureModal);
