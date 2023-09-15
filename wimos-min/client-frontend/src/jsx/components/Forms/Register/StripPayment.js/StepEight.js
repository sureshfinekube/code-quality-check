import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "../../Wizard/renderField";
// import validate from "../../ReduxWizard/validate";
import { connect, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import swal from "sweetalert";
import { toast } from "react-toastify";

// import {
//   signupAction,
//   loadingToggleAction,
//   stripePaymentMethodHandler,
// } from "../../../../store/actions/AuthActions";
const stripePromise = loadStripe(
  "pk_test_51KkjsXSIXjbMAn0tMyXxZsIJiuRQ7WVbB3z344iFw9KcW88Ht5Pv88IGHAZp68hnjZEvL5ftaFAHw8ZjkcJwtxDw00BkEbyZoa"
);

const cart = () => {
  return (
    <React.Fragment>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <span className="badge bg-secondary badge-pill">3</span>
      </h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Product name</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">₹1200</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Second product</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">₹800</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Third item</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">₹500</span>
        </li>
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Promo code</h6>
            <small>EXAMPLECODE</small>
          </div>
          <span className="text-success">-₹500</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (INR)</span>
          <strong>₹1000</strong>
        </li>
      </ul>
    </React.Fragment>
  );
};

const StepEight = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const [paymentCompleted, setPaymentCompleted] = useState();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  // const mainMessage = () => {
  //   return (
  //     <React.Fragment>
  //       {/* <div className="col-md-5 order-md-2 mb-4">{cart()}</div> */}

  //       <div className="col-md-12 order-md-1">
  //         <Elements stripe={stripePromise}>
  //           <CheckoutForm
  //             // amount={1500}
  //             setPaymentCompleted={setPaymentCompleted}
  //           />
  //         </Elements>
  //       </div>
  //     </React.Fragment>
  //   );
  // };

  const checkStatus = () => {
    const query = new URLSearchParams(window.location.search);

    if ((query.get.success = true)) {
      swal("success", "Payment success", "success", {
        button: "Try Again",
        timer: 1000,
      });

      // return (
      //   <div className="success-msg">
      //     <svg
      //       width="1em"
      //       height="1em"
      //       viewBox="0 0 16 16"
      //       className="bi bi-check2"
      //       fill="currentColor"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         fill-rule="evenodd"
      //         d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
      //       />
      //     </svg>
      //     <div
      //       className="title"
      //       textAlign="center"
      //       justifyContent="center"
      //       alignItems="center"
      //     >
      //       <center>Payment Failed</center>
      //     </div>
      //   </div>
      // );
    } else if ((query.get.success = false)) {
      swal("Error", "Payment failed", "Error", {
        button: "Try Again",
        timer: 1000,
      });
      // return (
      //   <div className="success-msg">
      //     <svg
      //       width="1em"
      //       height="1em"
      //       viewBox="0 0 16 16"
      //       className="bi bi-check2"
      //       fill="currentColor"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         fill-rule="evenodd"
      //         d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
      //       />
      //     </svg>
      //     <div
      //       className="title"
      //       textAlign="center"
      //       justifyContent="center"
      //       alignItems="center"
      //     >
      //       <center>Payment Successful</center>
      //     </div>
      //   </div>
      // );
    }
    // else {
    //   return (
    //     <React.Fragment>
    //       {/* <div className="col-md-5 order-md-2 mb-4">{cart()}</div> */}

    //       <div className="col-md-12 order-md-1">
    //         {/* <Elements stripe={stripePromise}>
    //           <CheckoutForm
    //             amount={1500}
    //             setPaymentCompleted={setPaymentCompleted}
    //           />
    //         </Elements> */}
    //       </div>
    //     </React.Fragment>
    //   );
    // }
  };

  return (
    // onSubmit={onRegister(props.registerData)}
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <div className="container">
          {/* <div className="py-1 text-center">
            <h4>
              Stripe Integration
              <a
                href="https://www.cluemediator.com/"
                target="_blank"
                rel="noopener noreferrer"
              >

              </a>
            </h4>
          </div> */}
          <div className="row s-box">{checkStatus()}</div>
        </div>
        <br />
      </div>
    </form>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     registerData: state.form.wizard.values,
//   };
// };
export default StepEight;
