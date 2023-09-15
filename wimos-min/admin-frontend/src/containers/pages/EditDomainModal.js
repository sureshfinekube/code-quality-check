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
  updateDomainAction,
  getDomainAction,
} from "../../redux/adminData/actions";

const EditDomainModal = ({
  modalOpen,
  edittoggleModal,
  updateDomainAction,
  onUpdateDomain,
  updateDomainErr,
  updateDomainSuccess,
  getDomainAction,
  data,
  test
}) => {
  console.log('tttttttest',data?._id)
  const [doaminName, setDomainName] = useState();
  const [domainId, setDomainId] = useState()
  const [erroeMsg, setErrorMsg] = useState({ status: false, error: "" });

  useEffect(() => {
    setDomainName(data?.domain)
    setDomainId(data?._id)
  }, [data])

  useEffect(() => {
    if (updateDomainSuccess === true) {
      edittoggleModal();
      resetForm();
      getDomainAction();
      NotificationManager.success(
        "Success",
        "Domain name changed successfully",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updateDomainSuccess]);
  const resetForm = () => {
    setDomainName("");
  };

  const regex = new RegExp(
    "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$"
  );

  const validateDomain = (doaminName, id) => {
    if (doaminName == "") {
      setErrorMsg({ status: true, error: "Please enter domain name" });
    } else {
      if (!regex.test(doaminName)) {
        setErrorMsg({ status: true, error: "Invalid domain name" });
      } else {
        setErrorMsg({ status: false, error: "" });
        updateDomainAction({ id, domain: doaminName });
      }
    }
  };

  const editDomainHandler = () => {
    validateDomain(doaminName, domainId);
  };

  return (
    <Form>
      <Modal
        isOpen={modalOpen}
        toggle={edittoggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={edittoggleModal}>Edit Domain</ModalHeader>
        <ModalBody>
          <Label>Domain Name</Label>
          {/* {formErrs.packageName && <><br /><span className='text-danger'>{formErrs.packageName}</span></>} */}
          <Input
            //className={formErrs.packageName.length > 0 ? 'border-danger' : ""}
            name="Domain Name"
            placeholder="Enter New Domain"
            defaultValue={data?.domain}
            onChange={(e) => setDomainName(e.target.value)}
          />
          {erroeMsg.status && <p className="alert-danger">{erroeMsg.error}</p>}

          <Button
            onClick={() => editDomainHandler()}
            className="mt-2"
            value="Add New"
          >
            Update
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={edittoggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};
const mapStateToProps = ({ adminData }) => {
  const { onUpdtaeDomain, updateDomainErr, updateDomainSuccess } = adminData;
  return { onUpdtaeDomain, updateDomainErr, updateDomainSuccess };
};

export default connect(mapStateToProps, {
  updateDomainAction,
  getDomainAction,
})(EditDomainModal);
