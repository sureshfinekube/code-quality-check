import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "./Script";
import axios from "axios";
import CreateCustomer from "../Subscription/CustomerRegister";
import { storeAction } from "../../../../../store/actions/AuthActions";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// const stripe = require("stripe")(
//   "pk_test_51KkjsXSIXjbMAn0tMyXxZsIJiuRQ7WVbB3z344iFw9KcW88Ht5Pv88IGHAZp68hnjZEvL5ftaFAHw8ZjkcJwtxDw00BkEbyZoa"
// );
function CheckoutForm(props) {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleEmailSub = async (e) => {
    // e.preventDefault();
    const { customer } = await fetch("/create-customer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    setCustomer(customer);
  };

  const handleSubscription = async (e) => {
    const subscription = await fetch("/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: "price_1L11VnSIXjbMAn0t9vIAkZvz",
        customerId: "cus_LiYBCVXjWVOl2R",
      }),
    });
  };

  const handleCheckOut = async (event) => {
    handleEmailSub();
    handleSubscription();
    // console.log("test");
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const paymentMethodObj = {
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name,
        email,
      },
    };
    const paymentMethodResult = await stripe.createPaymentMethod(
      paymentMethodObj
    );

    stripePaymentMethodHandler(
      {
        result: paymentMethodResult,
        amount: props.amount,
      },
      handleResponse
    );
    // <WizardFormTenPage />;
  };

  const handleSub = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        email: "tijojohnsy143@gmail.com",
      },
    });

    if (result.error) {
      console.log("errorsub", result.error.message);
    } else {
      const res = {
        id: "ch_3KlAwD2eZvKYlo2C1via2csJ",
        success: true,
        object: "charge",
        amount: 100,
        amount_captured: 0,
        amount_refunded: 0,
        status: "requires_action",
      };
      // await axios.post("http://localhost:3000/sub", {
      //   payment_method: result.paymentMethod.id,
      //   email: email,
      // });
      // eslint-disable-next-line camelcase

      // const subscription = await stripe.subscriptions({
      //   customer: res.id,
      //   items: [{ plan: "price_1KkjunSIXjbMAn0t1URrCtj0" }],
      //   expand: ["latest_invoice.payment_intent"],
      // });

      const status = "requires_action";
      const client_secret = "5000usd";

      if (status === "requires_action") {
        // stripe.confirmCardPayment(client_secret).then(function (result) {
        if (result.error) {
          // console.log("There was an issue!");
          console.log("errorrrrrr", result.error);
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
        } else {
          console.log("You got the money!");
          // Show a success message to your customer
        }
        // });
      } else {
        console.log("You got the money!");
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  // // callback method to handle the response
  const handleResponse = (response) => {
    setLoading(false);
    if (response.error) {
      setErrorMsg(
        typeof response.error === "string"
          ? response.error
          : response.error.message
      );
      return;
    }

    props.setPaymentCompleted(response.success ? true : false);
  };

  return (
    <React.Fragment>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Pay with card</span>
      </h4>
      {/* {!success ?  */}
      <form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input
              id="cc-name"
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-email">Email</label>
            <input
              id="cc-email"
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card Number</label>
            <CardNumberElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>
        <hr className="mb-4" />
        <button
          className="btn btn-dark w-100"
          // type="submit"
          // disabled={loading}
          onClick={handleCheckOut}
          // onClick={stripePaymentMethodHandler}
        >
          {/* {loading ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            ></div> */}
          PAY
        </button>
        <br />
        {/* <button onClick={handleSub} className="btn btn-info w-100">
          Sub
        </button> */}
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
        <div></div>
      </form>
    </React.Fragment>
  );
}
// ₹${props.amount}
//        <button
// className="btn btn-dark w-100"
// // type="submit"
// disabled={loading}
// onClick={handleCheckOut}
// // onClick={stripePaymentMethodHandler}
// >
// {loading ? (
//   <div
//     className="spinner-border spinner-border-sm text-light"
//     role="status"
//   ></div>
// ) : (
//   `PAY `
// )}
// </button>
const mapStateToProps = (state) => {
  return {
    storeId: state.auth.selectedStore.id,
  };
};
export default connect(mapStateToProps, {
  storeAction,
})(CheckoutForm);
