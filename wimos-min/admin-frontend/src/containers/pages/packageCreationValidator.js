export const packageNameValidator = (
  value,
  setPackageName,
  form,
  formErrsSet
) => {
  setPackageName(value);

  if (value.length < 3) {
    formErrsSet({
      ...form,
      packageName: "Minimum 3 Characters needed",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      packageName: "",
    });
    return true;
  }
};
export const amountValidator = (value, setAmount, form, formErrsSet) => {
  // console.log("val", value);
  if (value === "") {
    // console.log("123");
    setAmount(value);
    formErrsSet({
      ...form,
      amount: "Please Enter value",
    });

    return false;
  }

  // value = parseInt(value);

  const re = /^[0-9\b]+$/;

  if (re.test(value)) {
    // console.log("tesr", value);
    setAmount(value);
  }

  if (value === "") {
    // console.log("value", value);
    formErrsSet({
      ...form,
      amount: "Please Enter value ",
    });

    return false;
  } else if (re.test(value)) {
    // console.log("1", re.test(value));
    formErrsSet({
      ...form,
      amount: "",
    });

    return true;
  }
};

export const yearlySubscriptionFeeValidator = (
  value,
  setYearlySubcsriptionFee,
  form,
  formErrsSet
) => {
  if (value === "") {
    setYearlySubcsriptionFee(value);
    formErrsSet({
      ...form,
      yearlySubscriptionFee: "Please Enter value greater than 0",
    });

    return false;
  }
  value = parseInt(value);

  const re = /^[0-9\b]+$/;

  if (re.test(value)) {
    setYearlySubcsriptionFee(value);
  }

  if (value < 1 || !value) {
    formErrsSet({
      ...form,
      yearlySubscriptionFee: "Please Enter value greater than 0",
    });

    return false;
  } else if (re.test(value) && value > 1) {
    formErrsSet({
      ...form,
      yearlySubscriptionFee: "",
    });

    return true;
  }
};

export const descriptionValidator = (
  value,
  setDesription,
  form,
  formErrsSet
) => {
  setDesription(value);

  if (value.length < 5) {
    formErrsSet({
      ...form,
      description: "Minimum 5 characters needed",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      description: "",
    });
    return true;
  }
};

export const statusValidator = (value, setStatus, form, formErrsSet) => {
  setStatus(value);

  if (value !== false && value !== true) {
    formErrsSet({
      ...form,
      status: "Please select a option",
    });

    return false;
  } else {
    //console.log("false");

    formErrsSet({
      ...form,
      status: "",
    });

    return true;
  }
};

export const subscriptionTypeValidator = (
  value,
  setSubscriptionType,
  form,
  formErrsSet
) => {
  setSubscriptionType(value);

  if (value.length < 2) {
    formErrsSet({
      ...form,
      subscriptionType: "Select a subscription type",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      subscriptionType: "",
    });

    return true;
  }
};

export const productLimitTypeValidator = (
  value,
  setProductType,
  form,
  formErrsSet
) => {
  setProductType(value);

  if (value.length < 2) {
    formErrsSet({
      ...form,
      productLimitType: "Select a product limit type",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      productLimitType: "",
    });

    return true;
  }
};

export const productLimitValueValidator = (
  value,
  productLimitType,
  setProductLimitValue,
  form,
  formErrsSet
) => {
  value = parseInt(value);

  setProductLimitValue(value);

  if (productLimitType === false && value <= 0) {
    formErrsSet({
      ...form,
      productLimitValue: "Please Enter value greater than 0",
    });

    return false;
  } else if (productLimitType === false && value > 0) {
    formErrsSet({
      ...form,
      productLimitValue: "",
    });
    return true;
  } else {
    formErrsSet({
      ...form,
      productLimitValue: "",
    });
    return true;
  }
};

export const userLimitTypeValidator = (
  value,
  setUserType,
  form,
  formErrsSet
) => {
  setUserType(value);

  if (value.length < 2) {
    formErrsSet({
      ...form,
      userLimitType: "Select a product limit type",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      userLimitType: "",
    });

    return true;
  }
};

export const colLimitValueValidator = (
  value,
  colLimitType,
  setColLimitValue,
  form,
  formErrsSet
) => {
  value = parseInt(value);

  setColLimitValue(value);

  if (colLimitType === false && value <= 0) {
    formErrsSet({
      ...form,
      colLimitValue: "Please Enter value greater than 0",
    });

    return false;
  } else if (colLimitType === false && value > 0) {
    formErrsSet({
      ...form,
      colLimitValue: "",
    });
    return true;
  } else {
    formErrsSet({
      ...form,
      colLimitValue: "",
    });
    return true;
  }
};

export const colLimitTypeValidator = (value, setColType, form, formErrsSet) => {
  setColType(value);

  if (value.length < 2) {
    formErrsSet({
      ...form,
      colLimitType: "Select a product limit type",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      colLimitType: "",
    });

    return true;
  }
};

export const userLimitValueValidator = (
  value,
  userLimitType,
  setUserLimitValue,
  form,
  formErrsSet
) => {
  value = parseInt(value);

  setUserLimitValue(value);

  if (userLimitType === false && value <= 0) {
    formErrsSet({
      ...form,
      userLimitValue: "Please Enter value greater than 0",
    });

    return false;
  } else if (userLimitType === false && value > 0) {
    formErrsSet({
      ...form,
      userLimitValue: "",
    });
    return true;
  } else {
    formErrsSet({
      ...form,
      userLimitValue: "",
    });
    return true;
  }
};

export const storeLimitTypeValidator = (
  value,
  setStoreType,
  form,
  formErrsSet
) => {
  setStoreType(value);

  if (value.length < 2) {
    formErrsSet({
      ...form,
      storeLimitType: "Select a store limit type",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      storeLimitType: "",
    });

    return true;
  }
};

export const storeLimitValueValidator = (
  value,
  storeLimitType,
  setStoreLimitValue,
  form,
  formErrsSet
) => {
  value = parseInt(value);

  setStoreLimitValue(value);

  if (storeLimitType === false && value <= 0) {
    formErrsSet({
      ...form,
      storeLimitValue: "Please Enter value greater than 0",
    });

    return false;
  } else if (storeLimitType === false && value > 0) {
    formErrsSet({
      ...form,
      storeLimitValue: "",
    });
    return true;
  } else {
    formErrsSet({
      ...form,
      storeLimitValue: "",
    });
    return true;
  }
};

export const pageLimitTypeValidator = (
  value,
  setPageType,
  form,
  formErrsSet
) => {
  setPageType(value);

  if (value.length < 2) {
    formErrsSet({
      ...form,
      pageLimitType: "Select a page limit type",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      pageLimitType: "",
    });

    return true;
  }
};

export const pageLimitValueValidator = (
  value,
  pageLimitType,
  setPageLimitValue,
  form,
  formErrsSet
) => {
  value = parseInt(value);

  setPageLimitValue(value);

  if (pageLimitType === false && value <= 0) {
    formErrsSet({
      ...form,
      pageLimitValue: "Please Enter value greater than 0",
    });

    return false;
  } else if (pageLimitType === false && value > 0) {
    formErrsSet({
      ...form,
      pageLimitValue: "",
    });
    return true;
  } else {
    formErrsSet({
      ...form,
      pageLimitValue: "",
    });
    return true;
  }
};

export const fileValidator = (file, form, formErrsSet) => {
  if (!file) {
    // console.log("nof file");
    formErrsSet({
      ...form,
      banner: "insert a banner",
    });

    return false;
  } else if (file) {
    formErrsSet({
      ...form,
      banner: "",
    });

    return true;
  }
};

export const featuresValidator = (values, form, formErrsSet) => {
  if (values.length == 0) {
    formErrsSet({
      ...form,
      features: "Add atleast one feature",
    });

    return false;
  } else {
    formErrsSet({
      ...form,
      features: "",
    });
    return true;
  }
};
