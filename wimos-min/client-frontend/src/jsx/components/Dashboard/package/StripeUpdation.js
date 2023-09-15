import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../../../images/wimos_logo.png";
import logowhite from "../../../../images/wimos_logo_white.png";
import { GetCurrentClientAction } from "../../../../store/actions/AuthActions";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

const StripeUpdation = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { background } = useContext(ThemeContext);
  const [success, setSuccess] = useState(false);
  // let [sessionId, setSessionId] = useState("");
  useEffect(() => {
    return () => {
      var toUrl = props.history.location.pathname;
      var url = "/" + toUrl.substring(toUrl.lastIndexOf("/") + 1);
      // console.log(url);
      history.push(url);
      // Anything in here is fired on component unmount.
    };
  }, []);

  // const history = useHistory();
  // const handleClick = () => {
  //   // dispatch(StripeSuccessAction(props.history));
  // };

  const checkStatus = () => {
    const query = new URLSearchParams(window.location.search);
    // setSessionId(query.get("session_id"));
    // console.log("success", query.get.success);
    // console.log("canceled", query.get.canceled);
    // console.log("session_id", query.get.session_id);

    if (query.get("success")) {
      // console.log("tyest");
      dispatch(GetCurrentClientAction());
      return (
        <div className="success-msg">
          <center>
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
            <h4>Payment Successfull</h4>
            <br />
            <center>
              <form action="/dashboard">
                <Button
                  // to={"./dashboard"}
                  id="checkout-and-portal-button"
                  type="submit"
                  className="btn btn-info w-30"
                  // onClick={handleClick}
                >
                  Go to dashboard
                </Button>
              </form>
            </center>
          </center>
        </div>
      );
    } else if (query.get("canceled")) {
      return (
        <div className="failed-msg">
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
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
                <b>Payment failed</b>
                <br /> <br />
                <form action="/change-packages">
                  <Button
                    to={"/change-packages"}
                    id="checkout-and-portal-button"
                    type="submit"
                    className="btn btn-info w-30"
                  >
                    Try again
                  </Button>
                </form>
              </center>
            </div>
          </center>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className="card text-center ">
      <div className="panel panel-default card-input">
        <div className="container h-100">
          <div className="row justify-content-center h-500 align-items-center">
            <div className="col-md-12">
              <div className="row no-gutters">
                <div className="auth-form">
                  <div className="row s-box">{checkStatus()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeUpdation;
