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
import {
  descriptionValidator,
  featuresValidator,
  amountValidator,
  packageNameValidator,
  productLimitTypeValidator,
  productLimitValueValidator,
  statusValidator,
  // yearlySubscriptionFeeValidator,
  fileValidator,
  subscriptionTypeValidator,
  storeLimitValueValidator,
  storeLimitTypeValidator,
  pageLimitValueValidator,
  pageLimitTypeValidator,
  userLimitValueValidator,
  userLimitTypeValidator,
  colLimitValueValidator,
  colLimitTypeValidator,
} from "./packageCreationValidator";
import { NotificationManager } from "components/common/react-notifications";
import { updatePackageAction } from "redux/actions";
import { connect } from "react-redux";

let objErrs = {
  packageName: "",
  amount: "",
  description: "",
  banner: "",
  productLimitType: "",
  productLimitValue: "",
  storeLimitType: "",
  storeLimitValue: "",
  pageLimitType: "",
  pageLimitValue: "",
  userLimitType: "",
  userLimitValue: "",
  colLimitType: "",
  colLimitValue: "",
  features: "",
  status: "",
  subscriptionType: "",
};

const UpdatePackageModal = ({
  modalOpen,
  toggleModal,
  // categories,
  // productLimits,
  updatePackageAction,
  data,
  onUpdatePackage,
  updatePackageSuccess,
}) => {
  //  console.log("data", data);
  useEffect(() => {
    if (data?.name) {
      setPackageId(data._id);
      setPackageName(data.name);
      setAmount(data.amount);
      setSubscriptionType(data.type);
      setProductLimited(!data.unlimited_product);
      setStoreLimited(!data.unlimited_store);
      setPageLimited(!data.unlimited_page);
      setUserLimited(!data.unlimited_user);
      setColLimited(!data.unlimited_collection);
      setProductLimitType(data.unlimited_product);
      setStoreLimitType(data.unlimited_store);
      setPageLimitType(data.unlimited_page);
      setUserLimitType(data.unlimited_user);
      setColLimitType(data.unlimited_collection);
      setProductLimitValue(data.product_limit);
      setStoreLimitValue(data.store_limit);
      setPageLimitValue(data.page_limit);
      setUserLimitValue(data.user_limit);
      setColLimitValue(data.collection_limit);
      setDescription(data.description);
      setStatus(data.status);
      setFeatures([...data.features]);
    }
  }, [data]);

  // const [file, setFile] = useState();
  const [packageId, setPackageId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [productLimitType, setProductLimitType] = useState("");
  const [storeLimitType, setStoreLimitType] = useState("");
  const [pageLimitType, setPageLimitType] = useState("");
  const [userLimitType, setUserLimitType] = useState("");
  const [colLimitType, setColLimitType] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [status, setStatus] = useState();
  const [amount, setAmount] = useState("");
  // const [yearlySubscriptionFee, setYearlySubscriptionFee] = useState("");
  const [productLimited, setProductLimited] = useState(false);
  const [storeLimited, setStoreLimited] = useState(false);
  const [pageLimited, setPageLimited] = useState(false);
  const [userLimited, setUserLimited] = useState(false);
  const [colLimited, setColLimited] = useState(false);
  const [productLimitValue, setProductLimitValue] = useState(0);
  const [storeLimitValue, setStoreLimitValue] = useState(0);
  const [pageLimitValue, setPageLimitValue] = useState(0);
  const [userLimitValue, setUserLimitValue] = useState(0);
  const [colLimitValue, setColLimitValue] = useState(0);
  const [features, setFeatures] = React.useState([{ value: "" }]);
  const [formErrs, setFormErrs] = React.useState(objErrs);

  // const fileChangeHandler = (event) => {
  //   setFile(event.target.files[0]);
  // };

  useEffect(() => {
    handleInputChange("features");
  }, [features]);

  useEffect(() => {
    if (updatePackageSuccess !== null) {
      resetForm();
      toggleModal();
    }
  }, [updatePackageSuccess]);

  // useEffect(() => {
  //   if (file) handleInputChange("banner", file);
  // }, [file]);

  useEffect(() => {
    if (productLimitType === true) {
      setProductLimitValue(0);
    }
  }, [productLimitType]);

  useEffect(() => {
    if (storeLimitType === true) {
      setStoreLimitValue(0);
    }
  }, [storeLimitType]);

  useEffect(() => {
    if (pageLimitType === true) {
      setPageLimitValue(0);
    }
  }, [pageLimitType]);

  useEffect(() => {
    if (userLimitType === true) {
      setUserLimitValue(0);
    }
  }, [userLimitType]);
  useEffect(() => {
    if (colLimitType === true) {
      setColLimitValue(0);
    }
  }, [colLimitType]);

  const handleInputChange = (name, value) => {
    if (name === "packageName") {
      return packageNameValidator(value, setPackageName, formErrs, setFormErrs);
    } else if (name === "subscriptionType") {
      // console.log("type", value);
      return subscriptionTypeValidator(
        value,
        setSubscriptionType,
        formErrs,
        setFormErrs
      );
    } else if (name === "amount") {
      return amountValidator(value, setAmount, formErrs, setFormErrs);
    }
    // else if (name === "yearlySubscriptionFee") {
    //   return yearlySubscriptionFeeValidator(
    //     value,
    //     setYearlySubscriptionFee,
    //     formErrs,
    //     setFormErrs
    //   );
    // }
    else if (name == "status") {
      return statusValidator(value, setStatus, formErrs, setFormErrs);
    } else if (name === "productLimitType") {
      return productLimitTypeValidator(
        value,
        setProductLimitType,
        formErrs,
        setFormErrs
      );
    } else if (name === "productLimitValue") {
      return productLimitValueValidator(
        value,
        productLimitType,
        setProductLimitValue,
        formErrs,
        setFormErrs
      );
    } else if (name === "userLimitType") {
      return userLimitTypeValidator(
        value,
        setUserLimitType,
        formErrs,
        setFormErrs
      );
    } else if (name === "userLimitValue") {
      return userLimitValueValidator(
        value,
        userLimitType,
        setUserLimitValue,
        formErrs,
        setFormErrs
      );
    } else if (name === "colLimitType") {
      return colLimitTypeValidator(
        value,
        setColLimitType,
        formErrs,
        setFormErrs
      );
    } else if (name === "colLimitValue") {
      return colLimitValueValidator(
        value,
        colLimitType,
        setColLimitValue,
        formErrs,
        setFormErrs
      );
    } else if (name === "storeLimitType") {
      return storeLimitTypeValidator(
        value,
        setStoreLimitType,
        formErrs,
        setFormErrs
      );
    } else if (name === "storeLimitValue") {
      return storeLimitValueValidator(
        value,
        storeLimitType,
        setStoreLimitValue,
        formErrs,
        setFormErrs
      );
    } else if (name === "pageLimitType") {
      return pageLimitTypeValidator(
        value,
        setPageLimitType,
        formErrs,
        setFormErrs
      );
    } else if (name === "pageLimitValue") {
      return pageLimitValueValidator(
        value,
        pageLimitType,
        setPageLimitValue,
        formErrs,
        setFormErrs
      );
    } else if (name === "description") {
      return descriptionValidator(value, setDescription, formErrs, setFormErrs);
    // } else if (name == "banner") {
    //   return fileValidator(file, formErrs, setFormErrs);
    } else if (name == "features") {
      return featuresValidator(features, formErrs, setFormErrs);
    } else if (name === "all") {
      let validated =
        packageNameValidator(
          packageName,
          setPackageName,
          formErrs,
          setFormErrs
        ) &&
        subscriptionTypeValidator(
          subscriptionType,
          setSubscriptionType,
          formErrs,
          setFormErrs
        ) &&
        amountValidator(amount, setAmount, formErrs, setFormErrs) &&
        // yearlySubscriptionFeeValidator(
        //   yearlySubscriptionFee,
        //   setYearlySubscriptionFee,
        //   formErrs,
        //   setFormErrs
        // ) &&
        featuresValidator(features, formErrs, setFormErrs) &&
        productLimitTypeValidator(
          productLimitType,
          setProductLimitType,
          formErrs,
          setFormErrs
        ) &&
        productLimitValueValidator(
          productLimitValue,
          productLimitType,
          setProductLimitValue,
          formErrs,
          setFormErrs
        ) &&
        userLimitTypeValidator(
          userLimitType,
          setUserLimitType,
          formErrs,
          setFormErrs
        ) &&
        userLimitValueValidator(
          userLimitValue,
          userLimitType,
          setUserLimitValue,
          formErrs,
          setFormErrs
        ) &&
        colLimitTypeValidator(
          colLimitType,
          setColLimitType,
          formErrs,
          setFormErrs
        ) &&
        colLimitValueValidator(
          colLimitValue,
          colLimitType,
          setColLimitValue,
          formErrs,
          setFormErrs
        ) &&
        storeLimitTypeValidator(
          storeLimitType,
          setStoreLimitType,
          formErrs,
          setFormErrs
        ) &&
        storeLimitValueValidator(
          storeLimitValue,
          storeLimitType,
          setStoreLimitValue,
          formErrs,
          setFormErrs
        ) &&
        pageLimitTypeValidator(
          pageLimitType,
          setPageLimitType,
          formErrs,
          setFormErrs
        ) &&
        pageLimitValueValidator(
          pageLimitValue,
          pageLimitType,
          setPageLimitValue,
          formErrs,
          setFormErrs
        ) &&
        // fileValidator(file, formErrs, setFormErrs) &&
        descriptionValidator(
          description,
          setDescription,
          formErrs,
          setFormErrs
        ) &&
        statusValidator(status, setStatus, formErrs, setFormErrs);

      return validated;
    }
  };

  const resetForm = () => {
    setPackageName("");
    setAmount("");
    setDescription("");
    setStatus();
    setProductLimited(false);
    setStoreLimited(false);
    setPageLimited(false);
    setUserLimited(false);
    setColLimited(false);
    setProductLimitType("");
    setStoreLimitType("");
    setPageLimitType("");
    setUserLimitType("");
    setColLimitType("");
    setProductLimitValue(0);
    setStoreLimitValue(0);
    setPageLimitValue(0);
    setUserLimitValue(0);
    setColLimitValue(0);
    setFeatures([{ value: "" }]);
    // setFile("");
    setFormErrs(objErrs);
    setSubscriptionType("");
  };

  const validateForm = () => {
    let validated = handleInputChange("all");
    if (validated) {
      // console.log("user", userLimitType, userLimitValue);
      // console.log("col", colLimitType, colLimitValue);
      let data = {
        id: packageId,
        name: packageName,
        type: subscriptionType,
        features,
        amount,
        unlimited_product: productLimitType,
        unlimited_page: pageLimitType,
        unlimited_store: storeLimitType,
        unlimited_user: userLimitType,
        unlimited_collection: colLimitType,
        product_limit: productLimitValue,
        store_limit: storeLimitValue,
        page_limit: pageLimitValue,
        user_limit: userLimitValue,
        collection_limit: colLimitValue,
        description,
      };
      // console.log("data",data);
      updatePackageAction(data);
    }
  };

  const featureAddController = () => {
    setFeatures([...features, { value: "" }]);
  };

  const onTextChange = (value, index) => {
    features[index].value = value;

    setFeatures((oldArray) => {
      return oldArray.filter((val, i) => {
        if (i == index) val.value = value;
        return val;
      });
    });
  };

  const featureCloseController = (index) => {
    setFeatures((oldArray) => {
      return oldArray.filter((value, i) => {
        return i !== index;
      });
    });
  };

  const formSubmitHandler = () => {
    validateForm();
  };

  return (
    <Form>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Update Package</ModalHeader>
        <ModalBody>
          <Label>Package Name</Label>
          {formErrs.packageName && (
            <>
              <br />
              <span className="text-danger">{formErrs.packageName}</span>
            </>
          )}
          <Input
            className={formErrs.packageName.length > 0 ? "border-danger" : ""}
            name="packageName"
            placeholder="Enter Package Name"
            value={packageName}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          <Label className="mt-3">Subscription type</Label>
          {formErrs.subscriptionType && (
            <>
              <br />
              <span className="text-danger">{formErrs.subscriptionType}</span>
            </>
          )}

          <CustomInput
            onChange={() => {
              handleInputChange("subscriptionType", "yearly_subscription");
            }}
            className={
              formErrs.subscriptionType.length > 0 ? "border-danger" : ""
            }
            type="radio"
            id="subscriptionType"
            name="subscriptionType"
            label="Yearly Subscription"
            defaultChecked={subscriptionType}
          />
          <CustomInput
            onChange={() => {
              handleInputChange("subscriptionType", "monthly_subscription");
            }}
            type="radio"
            id="subscriptionType1"
            name="subscriptionType"
            label="Monthly Subscription"
            defaultChecked={subscriptionType}
          />

          <Label className="mt-3">Subsription Fee</Label>
          {formErrs.amount && (
            <>
              <br />
              <span className="text-danger">{formErrs.amount}</span>
            </>
          )}
          <Input
            className={formErrs.amount.length > 0 ? "border-danger" : ""}
            name="amount"
            value={amount}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder="Enter Subsription Fee"
          />

          {/* <Label className="mt-3">Yearly Subsription Fee</Label>
        {formErrs.yearlySubscriptionFee && (
          <>
            <br />
            <span className="text-danger">
              {formErrs.yearlySubscriptionFee}
            </span>
          </>
        )}
        <Input
          className={
            formErrs.yearlySubscriptionFee.length > 0 ? "border-danger" : ""
          }
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          value={yearlySubscriptionFee}
          name="yearlySubscriptionFee"
          placeholder="Enter Yearly Fee"
        /> */}

          <Label className="mt-3">Features</Label>
          {formErrs.features && (
            <>
              <br />
              <span className="text-danger">{formErrs.features}</span>
            </>
          )}
          <div>
            {features.map((elem, index) => {
              return (
                <Row key={index}>
                  <Colxx xxs="10" className="px-0">
                    <Input
                      onChange={(e) => onTextChange(e.target.value, index)}
                      className="w-80 ml-auto mt-1"
                      placeholder={`Enter Feature ${index + 1}`}
                      value={elem.value}
                    />
                  </Colxx>
                  <Colxx xxs="2" className="pt-1">
                    <i
                      onClick={() => featureCloseController(index)}
                      style={{ fontSize: "27px", cursor: "pointer" }}
                      className="glyph-icon iconsminds-arrow-x-right"
                    />
                  </Colxx>
                </Row>
              );
            })}

            <Button
              onClick={() => featureAddController()}
              className="mt-2"
              value="Add New"
            >
              Add New +
            </Button>
          </div>

          <Label className="mt-3">Product Limit type</Label>
          {formErrs.productLimitType && (
            <>
              <br />
              <span className="text-danger">{formErrs.productLimitType}</span>
            </>
          )}

          <CustomInput
            onChange={() => {
              handleInputChange("productLimitType", true);
              setProductLimited(false);
            }}
            className={
              formErrs.productLimitType.length > 0 ? "border-danger" : ""
            }
            type="radio"
            id="productLimitType"
            name="productLimitType"
            label="UNLIMITED"
            checked={productLimitType === true ? true : false}
          />
          <CustomInput
            onChange={() => {
              handleInputChange("productLimitType", false);
              setProductLimited(true);
            }}
            type="radio"
            id="productLimitType1"
            name="productLimitType"
            label="LIMITED"
            checked={productLimitType === false ? true : false}
          />

          {productLimited && (
            <>
              <Label className="mt-3">Product limit</Label>
              {formErrs.productLimitValue && (
                <>
                  <br />
                  <span className="text-danger">
                    {formErrs.productLimitValue}
                  </span>
                </>
              )}
              <SliderTooltip
                name="productLimitValue"
                min={0}
                max={2500}
                value={productLimitValue}
                defaultValue={0}
                onChange={(e) => {
                  handleInputChange("productLimitValue", e);
                }}
                className={
                  formErrs.productLimitValue.length > 0
                    ? "border-danger mb-5"
                    : "mb-5"
                }
                step={10}
              />
            </>
          )}

          <Label className="mt-3">User Limit type</Label>
          {formErrs.userLimitType && (
            <>
              <br />
              <span className="text-danger">{formErrs.userLimitType}</span>
            </>
          )}

          <CustomInput
            onChange={() => {
              handleInputChange("userLimitType", true);
              setUserLimited(false);
            }}
            className={formErrs.userLimitType.length > 0 ? "border-danger" : ""}
            type="radio"
            id="userLimitType"
            name="userLimitType"
            label="UNLIMITED"
            checked={userLimitType === true ? true : false}
          />
          <CustomInput
            onChange={() => {
              handleInputChange("userLimitType", false);
              setUserLimited(true);
            }}
            type="radio"
            id="userLimitType1"
            name="userLimitType"
            label="LIMITED"
            checked={userLimitType === false ? true : false}
          />

          {userLimited && (
            <>
              <Label className="mt-3">Users limit</Label>
              {formErrs.userLimitValue && (
                <>
                  <br />
                  <span className="text-danger">{formErrs.userLimitValue}</span>
                </>
              )}
              <SliderTooltip
                name="userLimitValue"
                min={0}
                max={2500}
                value={userLimitValue}
                defaultValue={0}
                onChange={(e) => {
                  handleInputChange("userLimitValue", e);
                }}
                className={
                  formErrs.userLimitValue.length > 0
                    ? "border-danger mb-5"
                    : "mb-5"
                }
                step={10}
              />
            </>
          )}

          <Label className="mt-3">Collection Limit type</Label>
          {formErrs.colLimitType && (
            <>
              <br />
              <span className="text-danger">{formErrs.colLimitType}</span>
            </>
          )}

          <CustomInput
            onChange={() => {
              handleInputChange("colLimitType", true);
              setColLimited(false);
            }}
            className={formErrs.colLimitType.length > 0 ? "border-danger" : ""}
            type="radio"
            id="colLimitType"
            name="colLimitType"
            label="UNLIMITED"
            checked={colLimitType === true ? true : false}
          />
          <CustomInput
            onChange={() => {
              handleInputChange("colLimitType", false);
              setColLimited(true);
            }}
            type="radio"
            id="colLimitType1"
            name="colLimitType"
            label="LIMITED"
            checked={colLimitType === false ? true : false}
          />

          {colLimited && (
            <>
              <Label className="mt-3">Collection limit</Label>
              {formErrs.colLimitValue && (
                <>
                  <br />
                  <span className="text-danger">{formErrs.colLimitValue}</span>
                </>
              )}
              <SliderTooltip
                name="colLimitValue"
                min={0}
                max={2500}
                value={colLimitValue}
                defaultValue={0}
                onChange={(e) => {
                  handleInputChange("colLimitValue", e);
                }}
                className={
                  formErrs.colLimitValue.length > 0
                    ? "border-danger mb-5"
                    : "mb-5"
                }
                step={10}
              />
            </>
          )}

          <Label className="mt-3">Store Limit type</Label>
          {formErrs.storeLimitType && (
            <>
              <br />
              <span className="text-danger">{formErrs.storeLimitType}</span>
            </>
          )}

          <CustomInput
            onChange={() => {
              handleInputChange("storeLimitType", true);
              setStoreLimited(false);
            }}
            className={
              formErrs.storeLimitType.length > 0 ? "border-danger" : ""
            }
            type="radio"
            id="storeLimitType"
            name="storeLimitType"
            label="UNLIMITED"
            checked={storeLimitType === true ? true : false}
          />
          <CustomInput
            onChange={() => {
              handleInputChange("storeLimitType", false);
              setStoreLimited(true);
            }}
            type="radio"
            id="storeLimitType1"
            name="storeLimitType"
            label="LIMITED"
            checked={storeLimitType === false ? true : false}
          />

          {storeLimited && (
            <>
              <Label className="mt-3">Store limit</Label>
              {formErrs.storeLimitValue && (
                <>
                  <br />
                  <span className="text-danger">
                    {formErrs.storeLimitValue}
                  </span>
                </>
              )}
              <SliderTooltip
                name="storeLimitValue"
                min={0}
                max={2500}
                value={storeLimitValue}
                defaultValue={0}
                onChange={(e) => {
                  handleInputChange("storeLimitValue", e);
                }}
                className={
                  formErrs.storeLimitValue.length > 0
                    ? "border-danger mb-5"
                    : "mb-5"
                }
                step={10}
              />
            </>
          )}

          <Label className="mt-3">Page Limit type</Label>
          {formErrs.pageLimitType && (
            <>
              <br />
              <span className="text-danger">{formErrs.pageLimitType}</span>
            </>
          )}

          <CustomInput
            onChange={() => {
              handleInputChange("pageLimitType", true);
              setPageLimited(false);
            }}
            className={formErrs.pageLimitType.length > 0 ? "border-danger" : ""}
            type="radio"
            id="pageLimitType"
            name="pageLimitType"
            label="UNLIMITED"
            checked={pageLimitType === true ? true : false}
          />
          <CustomInput
            onChange={() => {
              handleInputChange("pageLimitType", false);
              setPageLimited(true);
            }}
            type="radio"
            id="pageLimitType1"
            name="pageLimitType"
            label="LIMITED"
            checked={pageLimitType === false ? true : false}
          />

          {pageLimited && (
            <>
              <Label className="mt-3">Page limit</Label>
              {formErrs.pageLimitValue && (
                <>
                  <br />
                  <span className="text-danger">{formErrs.pageLimitValue}</span>
                </>
              )}
              <SliderTooltip
                name="pageLimitValue"
                min={0}
                max={2500}
                value={pageLimitValue}
                defaultValue={0}
                onChange={(e) => {
                  handleInputChange("pageLimitValue", e);
                }}
                className={
                  formErrs.pageLimitValue.length > 0
                    ? "border-danger mb-5"
                    : "mb-5"
                }
                step={10}
              />
            </>
          )}

          <Label className="mt-4">Description</Label>
          {formErrs.description && (
            <>
              <br />
              <span className="text-danger">{formErrs.description}</span>
            </>
          )}
          <Input
            className={formErrs.description.length > 0 ? "border-danger" : ""}
            placeholder="Enter Description"
            name="description"
            value={description}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            type="textarea"
            id="exampleText"
          />

          {/* <Label className="mt-4">Banner</Label>
          {formErrs.banner && (
            <>
              <br />
              <span className="text-danger">{formErrs.banner}</span>
            </>
          )}
          <InputGroup className="mb-3">
            <CustomInput
              className={formErrs.banner.length > 0 ? "border-danger" : ""}
              type="file"
              id="exampleCustomFileBrowser2"
              name="banner"
              accept="image/png, image/gif, image/jpeg"
              onChange={fileChangeHandler}
            />
            <InputGroupAddon addonType="append">Upload</InputGroupAddon>
          </InputGroup> */}

          <Label className="mt-4">Add to Live ?</Label>
          {formErrs.status && (
            <>
              <br />
              <span className="text-danger">{formErrs.status}</span>
            </>
          )}
          <CustomInput
            type="radio"
            id="exCustomRadio"
            onChange={(e) => {
              handleInputChange("status", true);
            }}
            name="status"
            label="Yes"
          />
          <CustomInput
            type="radio"
            id="exCustomRadio1"
            onChange={(e) => {
              handleInputChange("status", false);
            }}
            name="status"
            label="No"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>

          {!onUpdatePackage ? (
            <Button type="submit" color="primary" onClick={formSubmitHandler}>
              <IntlMessages id="pages.submit" />
            </Button>
          ) : (
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state  ${
                onUpdatePackage ? "show-spinner" : ""
              }`}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">UPDATE</span>
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </Form>
  );
};
const mapStateToProps = ({ adminData }) => {
  const {
    onCreatePackage,
    createPackageErr,
    createPackageSuccess,
    onUpdatePackage,
    updatePackageSuccess,
  } = adminData;
  return {
    onCreatePackage,
    createPackageErr,
    createPackageSuccess,
    onUpdatePackage,
    updatePackageSuccess,
  };
};

export default connect(mapStateToProps, {
  updatePackageAction,
})(UpdatePackageModal);
