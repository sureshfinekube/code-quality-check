import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ForgotPassword from "../components/Forms/ForgotPassword/ForgotPassword";
import { ThemeContext } from "../../context/ThemeContext";
// image
import logo from "../../images/wimos_logo.png";
import logowhite from "../../images/wimos_logo_white.png";
const ForgotPassWord = ({ history }) => {
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   history.push("/dashboard");
  // };
  const { background } = useContext(ThemeContext);
  const [step, setStep] = useState(1);

  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container ">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      {step !== 1 ? (
                        <div
                          className="col-1 align-items-center side-back"
                          onClick={(e) => prevStep()}
                        >
                          <h1 style={{ color: "#fff" }}>
                            <i className="fas fa-angle-double-left shake"></i>
                          </h1>
                        </div>
                      ) : (
                        <div className="col-1 align-items-center " />
                      )}
                      <Link to="/login">
                        {background.value === "dark" ? (
                          <img src={logowhite} alt="" />
                        ) : (
                          <img src={logo} alt="" />
                        )}
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <ForgotPassword history={history} step={step} />
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

export default ForgotPassWord;
