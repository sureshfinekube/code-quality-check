// import { Card } from "material-ui";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import metamask from "../../../../../images/metamask.ico";
import { connect, useDispatch } from "react-redux";
import {
  UpdateStep,
  UpdateStoreStep,
} from "../../../../../services/AuthService";
import {
  StripeSuccessAction,
  GetCurrentClientAction,
} from "../../../../../store/actions/AuthActions";
import axios from "axios";
import swal from "sweetalert";
import success from "../../../../../images/swal-success.png";
import failed from "../../../../../images/swal-error.png";
import ReactLoading from "react-loading";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const { ethereum } = window;

const WalletConnection = ({
  nextStep,
  prevStep,
  history,
  sid,
  isnewstore,
  freemint,
  setFreemint,
}) => {
  const [metaValue, setValue] = useState("");
  //const [isfreemint, setIsfreemint] = useState(false);
  const [complete, setComplte] = useState(false);
  const [metaapistatus, setMetaapistatus] = useState(false);
  const dispatch = useDispatch();
  const CustomTooltip = withStyles({
    tooltip: {
      color: "#fff",
      backgroundColor: "#bd1bb3b0",
      width: "200px",
      padding: "10px",
    },
  })(Tooltip);
  //
  useEffect(() => {
    // Web3 Browswer Detection
    dispatch(GetCurrentClientAction());
    if (typeof window.ethereum !== "undefined") {
      console.log("Injected Web3 Wallet is installed!");
    }

    //Button ID
    const connectButton = document.getElementById("connect");

    //Click Event
    connectButton.addEventListener("click", () => {
      connectAccount();
    });

    //Connect Account Function
    async function connectAccount() {
      if (ethereum) {
        setComplte(true);
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        //   connectButton.innerHTML =
        //     account[0] +
        //     account[1] +
        //     account[2] +
        //     account[3] +
        //     account[4] +
        //     account[5] +
        //     "..." +
        //     account[38] +
        //     account[39] +
        //     account[40] +
        //     account[41];
        setValue(account);

        // console.log(metaValue);
        //props.change("metaId", accounts, undefined);
        // setValue("Sucessfully connected, Account:   " + accounts);
        //   connectButton.innerHTML = "Connect to Metamask";
      } else {
        console.log("Metamask not connected");
      }
    }
  }, []);

  useEffect(() => {
    if (metaValue !== "") {
      setTimeout(function () {
        walletidHandler(metaValue, freemint);
      }, 5000);
    }
  }, [metaValue, freemint]);

  const walletidHandler = (account, freemintdata) => {
    //console.log("free", freemintdata);
    let BaseUrl = "https://lb.wimos.io/api";
    const instance = axios.create({
      baseURL: BaseUrl,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("c_wimos"),
      },
    });
    const Data = {
      storeId: sid,
      metamaskId: account,
      isLazyMintingContract: freemintdata,
    };
    // console.log(Data);
    instance
      .post("/store/save-metamaskId", Data)
      .then((response) => {
        // console.log("props.history", history);
        if (response.data.status) {
          setMetaapistatus(true);
        }
      })
      .catch((err) => {
        // console.log("err", err.response);
        swal("Oops", "Somthing went wrong ", {
          icon: failed,
          buttons: {
            cancel: "Try Again!",
          },
        });
        setComplte(false);
      });
  };
  //

  useEffect(() => {
    if (metaapistatus) {
      swal("Success!", "Store Created Successfully", {
        icon: success,
        buttons: {
          confirm: "Continue",
        },
        timer: 2000,
      });
      dispatch(StripeSuccessAction(sid, history));
      if (isnewstore) {
        UpdateStoreStep(12);
      } else {
        UpdateStoreStep(12);
        UpdateStep(15);
      }
      setComplte(false);
    }
  }, [metaapistatus]);

  const FreemintChange = (e) => {
    setFreemint(e.target.checked);
    //setIsfreemint(e.target.checked);
  };

  // useEffect(() => {
  //   console.log(freemint);
  // }, [freemint]);
  // const { connect, isActive, account, shouldDisable } = useMetaMask();
  return (
    <div className="row">
      <center>
        <b>Connect Wallet</b>
      </center>

      <div className="col-md-3"></div>
      <div className="col-md-6">
        <br />
        {/* <div style={{ display: "flex" }}>
          <p style={{ width: "100%" }}>
            <b>Free minting</b>
            <CustomTooltip
              title={
                <div style={{ fontSize: "12px" }}>
                  Your NFT won't be minted in blockchain. Your NFT will be
                  stored for future minting by buyer
                </div>
              }
              placement="bottom"
            >
              <i
                className="far fa-question-circle"
                style={{ color: "#bd3bb1", marginLeft: "10px" }}
              />
            </CustomTooltip>
            <br />
            <span style={{ fontSize: "9px" }}>
              Buyer will pay gas fees for minting
            </span>
          </p>
          <div className="form-check form-switch toggle-switch">
            <input
              className="form-check-input custome"
              type="checkbox"
              checked={freemint}
              onChange={(e) => FreemintChange(e)}
              // id="flexSwitchCheckChecked1"
              // defaultChecked
            />
          </div>
        </div> */}
        <br />
        <div className="d-grid gap-2 ">
          {/* <Button
            // onClick={connectAccount}
            id="connect"
            className="me-2"
            variant="outline-warning"
            size="md"
            // onClick={connect}
          >
            <img src={metamask}></img>
            Connect to Metamask
          </Button> */}
          <Card id="connect" style={{ background: "#bd1bb3", padding: "8px" }}>
            {!complete ? (
              <div
                className="heading"
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                <h5
                  style={{
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <img
                    src={metamask}
                    style={{ width: "9%", height: "1.8rem" }}
                  ></img>
                  {"     "}
                  Connect to Metamask
                </h5>
                {/* <h6 className="comingsoon"> Coming soon..</h6> */}
              </div>
            ) : (
              <div
                className="heading"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h5
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    marginRight: "115px",
                  }}
                >
                  Creating Store
                </h5>

                <ReactLoading
                  type={"spinningBubbles"}
                  color={"#fff"}
                  height={"30x"}
                  width={"20px"}
                  // delay={10000}
                  padding-bottom={"6px"}
                />
                {/* <h6 className="comingsoon"> Coming soon..</h6> */}
              </div>
            )}
          </Card>
          {/* <span style={{ textAlign: "center" }}>
            {metaValue !== "" && <p>{metaValue}</p>}
          </span> */}
        </div>
        <br />

        {/* <div className="mt-2 mb-2"> 
          Connected Account: {isActive ? account : ""}
        </div> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps)(WalletConnection);
