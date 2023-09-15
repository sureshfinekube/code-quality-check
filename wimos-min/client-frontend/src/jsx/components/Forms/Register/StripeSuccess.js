import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../../../images/wimos_logo.png";
import logowhite from "../../../../images/wimos_logo_white.png";
import {
  StripeSuccessAction,
  GetCurrentClientAction,
} from "../../../../store/actions/AuthActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UpdateStep } from "../../../../services/AuthService";

const StripeSuccess = (props) => {
  const dispatch = useDispatch();
  const { background } = useContext(ThemeContext);
  const [success, setSuccess] = useState(false);
  // let [sessionId, setSessionId] = useState("");
  // console.log("success", success);
  let history = useHistory();

  // const history = useHistory();
  const handleClick = () => {
    dispatch(StripeSuccessAction(props.history));
    dispatch(GetCurrentClientAction());
    UpdateStep(15);
    // history.push("/login");
  };

  const apiCallHandler = async (Data) => {
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("c_wimos"),
      },
    });
    return instance.post(`/payments/verification`, Data);
  };

  const checkStatus = () => {
    const query = new URLSearchParams(window.location.search);
    // setSessionId(query.get("session_id"));
    const sessionid = query.get("session_id");
    const Data = {
      sessionId: sessionid,
    };
    apiCallHandler(Data)
      .then((response) => {
        //console.log("response", response);
        // console.log("successstatusssssssss", response.data.data.payment_status);
        if (response.data.data.payment_status === "success") {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((err) => {
        //console.log("err", err.response);
        setSuccess(false);
      });

    if (success) {
      return (
        <div className="success-msg">
          {/* <i
            class="fa fa-check green-circle"
            style={{ width: "50em", height: "10em" }}
          ></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <br />
          <h4>Payment successfull</h4>
          <br />
          <button
            to={"./dashboard"}
            id="checkout-and-portal-button"
            type="submit"
            className="btn btn-info w-50"
            onClick={handleClick}
          >
            Go to dashboard
          </button>{" "}
        </div>
      );
    } else if (!success) {
      // swal("Error", "Payment failed", "Error", {
      //   button: "Try Again",
      //   timer: 1000,
      // });
      return (
        <div className="success-msg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <div
            className="title"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <center>
              <b style={{ color: "red" }}>Payment failed</b>
              <br /> <br />
              <button
                to={"./login"}
                id="checkout-and-portal-button"
                type="submit"
                className="btn btn-info w-100"
                onClick={handleClick}
              >
                Try to again
              </button>{" "}
            </center>
          </div>
        </div>
      );
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

    // <div className="col-md-12">
    //   <div className="container">
    //
    //   </div>
    //   <br />
    // </div>

    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-7">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-5">
                      {/* <Link to="/login"> */}
                      {background.value === "dark" ? (
                        <img src={logowhite} alt="" />
                      ) : (
                        <img src={logo} alt="" />
                      )}
                      {/* </Link> */}
                    </div>

                    <div className="row s-box">{checkStatus()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeSuccess;
