const validate = (values) => {
  // const re = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const errors = {};
  if (!values.firstName) {
    errors.firstName = <h6 style={{ color: "red" }}>Name Required</h7>;
  }
  if (!values.userName) {
    errors.userName = <h6 style={{ color: "red" }}>Username Required</h7>;
  } else if (
    values.userName.length < 6 ||
    !/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(
      values.userName
    )
  ) {
    errors.userName = "Username Required"; // errors.username = <h8 style={{ color: 'red' }}>Please enter valid username</h8>;
  }
  // if (!values.email) {
  //   errors.email = 'Email Required';
  // }
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address';
  // }
  if (!values.contactnumber) {
    errors.contactnumber = "Mobile Number Required";
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = "Confirm Password Required56666666666666666666666";
  }
  if (!values.password) {
    errors.password = "Password Required";
  }
  if (values.password === values.confirmpassword) {
    errors.password = "Password Missmacthed";
  }
  if (values.domainName === "") {
    errors.domainName = "domainName Required";
  }
  return errors;
};

export default validate;
