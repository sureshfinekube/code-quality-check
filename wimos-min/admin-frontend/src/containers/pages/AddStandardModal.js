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

import { NotificationManager } from "components/common/react-notifications";
// import { createPackageAction } from 'redux/actions';
import { connect } from "react-redux";
// import { addDomainAction } from "../../redux/adminData/actions";

const AddStandardModal = ({
  modalOpen,
  toggleModal,
  addDomainAction,
  onAddDomain,
  addDomainErr,
  addDomainSuccess,
}) => {
  const [standardName, setStandardName] = useState("");

  const [erroeMsg, setErrorMsg] = useState("");

  //   useEffect(() => {
  //     if (addDomainSuccess === true) {
  //       toggleModal();
  //       resetForm();
  //       NotificationManager.success(
  //         "Success",
  //         "Domain Added",
  //         3000,
  //         null,
  //         null,
  //         ""
  //       );
  //     }
  //   }, [addDomainSuccess]);

  const resetForm = () => {
    setStandardName("");
  };

  //   const addDomainHandler = () => {
  //     // console.log("done");
  //  addDomainAction(standardName);
  //   };

  return (
    <Form>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Add New Standard</ModalHeader>
        <ModalBody>
          <Label>Standard Name</Label>
          {/* {formErrs.packageName && <><br /><span className='text-danger'>{formErrs.packageName}</span></>} */}
          <Input
            //className={formErrs.packageName.length > 0 ? 'border-danger' : ""}
            name="Standard Name"
            placeholder="Enter New Standard"
            value={standardName}
            onChange={(e) => setStandardName(e.target.value)}
          />

          <Button
            // onClick={() => addDomainHandler()}
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
        </ModalFooter>
      </Modal>
    </Form>
  );
};
const mapStateToProps = ({ adminData }) => {
  const { onAddDomain, addDomainErr, addDomainSuccess } = adminData;
  return { onAddDomain, addDomainErr, addDomainSuccess };
};

export default connect(mapStateToProps)(AddStandardModal);
