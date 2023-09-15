import React, { useState, useEffect } from "react";
import PackageSelect from "./PackageSelect";
import axios from "axios";
import { packageAction } from "../../../../store/actions/packageAction";
import { connect } from "react-redux";
import { propTypes } from "react-bootstrap/esm/Image";
// import StepEight from "./StripPayment.js/StepEight";

// import "./App.css";

// const CreateCustomer = () => {

// };

const ProductDisplay = () => (
  <section>
    <div className="product">
      {/* <Logo /> */}
      <div className="description">
        <PackageSelect />
      </div>
    </div>

    {/* <button
      id="checkout-and-portal-button"
      type="submit"
      className="btn btn-info w-100"
      onClick={ChekOutApi}
    >
      Checkout
    </button> */}
  </section>
);

const SuccessDisplay = ({ sessionId }) => {
  return (
    <section>
      <div className="product Box-root">
        <Logo />
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

function Subs() {
  let [message, setMessage] = useState("");
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // const { errorMessage, sucessMessage } = this.props;
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
    });

    instance
      .post(
        "/payments/create-customer",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // sucessMessage("response");

        //console.log("dn", values.domainName);
      })
      .catch((err) => {
        // errorMessage("err", err);
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
      setMessage("Payment Sccuessfully completed");
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage("Payment failed.Try again");
    }
  }, [sessionId]);

  if (!success && message === "") {
    return <ProductDisplay />;
  } else if (success && sessionId !== "") {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);
const mapStateToProps = (state) => {
  return {
    // StripePriceId: state.register.packages.packages.stripe_price_id,
    packages: state.packages.packages,
  };
};
export default connect(mapStateToProps, {
  packageAction,
})(Subs);
