import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import loadingImage from "./images/loader-con.gif";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "./Progressbar/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import ReactLoading from "react-loading";
// import ProgressBar from "@react-aria/progress";

const App = (props) => {
  //console.log("props::", props);
  const [percentage, setPercentage] = useState(20);
  const [duration, setDuration] = useState(15);
  let web3;
  let provider;
  const [handle, setHandle] = React.useState(false);
  const [isabifetch, setAbifetch] = React.useState(false);
  const [isabisuccess, setAbiSucess] = React.useState(false);
  const [abidata, setAbidata] = React.useState("");
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    // let chainId = web3.eth.net.getId();
    // console.log("chainID: ", chainId);
  }

  const deployOnClick = async () => {
    setPercentage(30);
    setHandle(true);

    let nftcontract = "";
    let proxycontract;
    let marketcontract = "";
    // console.log("jdfhui");
    //  console.log("jkdnkjew", web3);

    try {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (res) => {
          //console.log(abidata);
          let metaid = await web3.eth.getAccounts();
          //console.log("hj", metaid[0]);
          let chainid = await web3.eth.getChainId();
          // console.log("ch", chainid);
        
          
        });
    } catch (error) {
      // console.log("error", error);
    }
  };

  const metamaskapiHandler = async (Data) => {
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
      headers: {
      },
    });
  };

  const apiCallHandler = async (Data) => {
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
      headers: {
      },
    });
    return instance.post(`/auth/contract-address`, Data);
  };
  const getabiHandler = async (Data) => {
    const instance = axios.create({
      // .. where we make our configurations
      baseURL: BaseUrl,
      withCredentials: true,
      headers: {
      },
    });
  };
  const apiAbi = async (Data) => {
    await getabiHandler(Data)
      .then((res) => {
        // console.log("res", res);
        setAbifetch(true);
        setAbidata(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    if (!isabifetch) {
      const Data = {
      };

      setTimeout(function () {
        apiAbi(Data);
      }, 2000);
    } else {
      // console.log("fghj", abidata);
      if (!abidata.status) {
        setAbifetch(false);
      } else {
        setAbiSucess(true);
      }
    }
  }, [isabifetch]);
  useEffect(() => {
    // if(abidata.data)
    if (!handle && isabisuccess) {
      setTimeout(function () {
        deployOnClick();
      }, 1000);
    }
  }, [handle, isabisuccess]);

  const style = buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    // rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "round",

    // Text size
    textSize: "12px",

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(189, 59, 177)`,
    textColor: "#000",
    trailColor: "#d6d6d6",
    backgroundColor: "#3e98c7",
  });
  return (
    <>
      <div
        className="row"
        style={{
          padding: "5px",
          borderRadius: "10px",
          // boxShadow:
          //   "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 1px 3px 1px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
        }}
      >
        {/* <div
          className=" d-inline-flex"
          style={{
            padding: "10px",
            // border: "1px solid #bd3bb1",
            borderRadius: "10px",
            // marginBottom: "15px",
            // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
          }}
        >
          <div className="col-11">
            <h6 style={{ margin: "4px" }}>Creating marketplace contract</h6>
          </div>
          <div className="col-1">
            {percentage >= 30 ? (
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)", fontSize: "25px" }}
              ></i>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#bd3bb1"}
                height={"25px"}
                width={"25px"}
                // delay={10000}
              />
            )}
          </div>
        </div> */}
        <div
          className=" d-inline-flex"
          style={{
            padding: "10px",
            // border: "1px solid #bd3bb1",
            borderRadius: "10px",
            // marginBottom: "15px",
            // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
          }}
        >
          <br />
          <div className="col-11">
            <h6 style={{ margin: "4px" }}>Creating and compiling contracts</h6>
          </div>
          <div className="col-1">
            {percentage >= 30 ? (
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)", fontSize: "25px" }}
              ></i>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#bd3bb1"}
                height={"25px"}
                width={"25px"}
                // delay={10000}
              />
            )}
          </div>
        </div>
        <br />

        <div
          className="d-inline-flex"
          style={{
            padding: "10px",
            // border: "1px solid #bd3bb1",
            borderRadius: "10px",
            // marginBottom: "15px",
          }}
        >
          <div className="col-11">
            <h6 style={{ margin: "4px" }}>Deploying marketplace contract</h6>
          </div>
          <div className="col-1">
            {percentage >= 40 ? (
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)", fontSize: "25px" }}
              ></i>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#bd3bb1"}
                height={"25px"}
                width={"25px"}
                // delay={10000}
              />
            )}
          </div>
        </div>

        <br />

        <div
          className="d-inline-flex"
          style={{
            padding: "10px",
            // border: "1px solid #bd3bb1",
            borderRadius: "10px",
            // marginBottom: "15px",
          }}
        >
          <div className="col-11">
            <h6 style={{ margin: "4px" }}>Deploying proxy contract</h6>
          </div>
          <div className="col-1">
            {percentage >= 60 ? (
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)", fontSize: "25px" }}
              ></i>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#bd3bb1"}
                height={"25x"}
                width={"25px"}
                // delay={10000}
              />
            )}
          </div>
        </div>

        <br />

        <div
          className="d-inline-flex"
          style={{
            padding: "10px",
            // border: "1px solid #bd3bb1",
            borderRadius: "10px",
            // marginBottom: "15px",
          }}
        >
          <div className="col-11">
            <h6 style={{ margin: "4px" }}>Deploying NFT contract</h6>
          </div>
          <div className="col-1">
            {percentage >= 80 ? (
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)", fontSize: "25px" }}
              ></i>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#bd3bb1"}
                height={"25x"}
                width={"25px"}
                // delay={10000}
              />
            )}
          </div>
        </div>

        <div
          className="d-inline-flex"
          style={{
            padding: "10px",
            // border: "1px solid #bd3bb1",
            borderRadius: "10px",
            // marginBottom: "15px",
          }}
        >
          <div className="col-11">
            <h6 style={{ margin: "4px" }}>Creating your store</h6>
          </div>
          <div className="col-1">
            {percentage >= 100 ? (
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)", fontSize: "25px" }}
              ></i>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#bd3bb1"}
                height={"25x"}
                width={"25px"}
                // delay={10000}
              />
            )}
          </div>
        </div>
      </div>
      {/* <ProgressBar label="Loading…" value={50} /> */}
      {/* <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      > */}
      {/* <div
          className="row"
          style={{
            textAlign: "center",
            width: 120,
            height: 100,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        > */}
      {/* <img
        src={"http://139.59.94.240:3003/" + loadingImage}
        alt="loader"
        width={"80px"}
      /> */}
      {/* <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={style}
      /> */}
      {/* 
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={percentage}
            duration={duration}
            easingFunction={easeQuadInOut}
            // repeat
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbar
                  value={value}
                  text={`${roundedValue}%`}
                 
                  styles={style}
                />
              );
            }}
          </AnimatedProgressProvider>
        </div>
        <div className="row" style={{ marginTop: "98px" }}>
          {percentage < 90 ? (
            <h4>
         
              Deploying Smart contract......
            </h4>
          ) : (
            ""
          )}
          <br />
          {percentage >= 80 && (
            <h4>
              Marketplace contract deployed{" "}
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)" }}
              ></i>
            </h4>
          )}
          {percentage >= 90 && (
            <h4>
              Smart contract deployed{" "}
              <i
                className="far fa-check-circle"
                style={{ color: "rgb(0, 188, 53)" }}
              ></i>
            </h4>
          )}
        </div>
      </div> */}
    </>
  );
};

export default App;
