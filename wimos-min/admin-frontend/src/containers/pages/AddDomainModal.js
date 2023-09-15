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
  addDomainAction,
  getDomainAction,
} from "../../redux/adminData/actions";

const AddDomainModal = ({
  modalOpen,
  toggleModal,
  addDomainAction,
  onAddDomain,
  addDomainErr,
  addDomainSuccess,
  getDomainAction,
}) => {
  const [doaminName, setDomainName] = useState("");
  // const [description, setDescription] = useState('');
  // const [productLimitType, setProductLimitType] = useState('');
  // const [status, setStatus] = useState();
  // const [monthlySubscriptionFee, setMonthlySubscriptionFee] = useState('');
  // const [yearlySubscriptionFee, setYearlySubscriptionFee] = useState('');
  // const [productLimited, setProductLimited] = useState(false);
  // const [productLimitValue, setProductLimitValue] = useState(0);
  const [erroeMsg, setErrorMsg] = useState({ status: false, error: "" });

  useEffect(() => {
    if (addDomainSuccess === true) {
      toggleModal();
      resetForm();
      getDomainAction();
      NotificationManager.success(
        "Success",
        "Domain Added",
        3000,
        null,
        null,
        ""
      );
    }
  }, [addDomainSuccess]);

  const resetForm = () => {
    setDomainName("");
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

  // const onTextChange = (value, index) => {
  //   features[index].value = value;

  //   setFeatures(oldArray => {
  //     return oldArray.filter((val, i) => {
  //       if (i == index) val.value = value;
  //       return val;
  //     }
  //     )
  //   });
  // };

  // const featureCloseController = (index) => {

  //   setFeatures(oldArray => {
  //     return oldArray.filter((value, i) => {
  //       return i !== index
  //     }
  //     )
  //   });

  // };

  // const formSubmitHandler = () => {
  //   validateForm();
  // }
  const regex = new RegExp(
    "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$"
  );

  const validateDomain = (doaminName) => {
    if (doaminName == "") {
      setErrorMsg({ status: true, error: "Please enter domain name" });
    } else {
      if (!regex.test(doaminName)) {
        setErrorMsg({ status: true, error: "Invalid domain name" });
      } else {
        setErrorMsg({ status: false, error: "" });
        addDomainAction({ domain: doaminName });
      }
    }
  };

  const addDomainHandler = () => {
    validateDomain(doaminName);
  };

  return (
    <Form>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Add New Domain</ModalHeader>
        <ModalBody>
          <Label>Domain Name</Label>
          {/* {formErrs.packageName && <><br /><span className='text-danger'>{formErrs.packageName}</span></>} */}
          <Input
            //className={formErrs.packageName.length > 0 ? 'border-danger' : ""}
            name="Domain Name"
            placeholder="Enter New Domain"
            value={doaminName}
            onChange={(e) => setDomainName(e.target.value)}
          />

          {erroeMsg.status && <p className="alert-danger">{erroeMsg.error}</p>}
          <Button
            onClick={() => addDomainHandler()}
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
  const { onAddDomain, addDomainErr, addDomainSuccess } = adminData;
  return { onAddDomain, addDomainErr, addDomainSuccess };
};

export default connect(mapStateToProps, {
  addDomainAction,
  getDomainAction,
})(AddDomainModal);
