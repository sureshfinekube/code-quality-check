import Image from "next/image";
import Anchor from "@ui/anchor";
import { useMoralis, useNativeBalance } from "react-moralis";
import { logoutData } from "src/redux/actions/main";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import Web3 from "web3";
import dummy from "./boy-avater.png";
import eth from "./Ethereum-Logo.png";
import { useEffect } from "react";
import { useState } from "react";

const UserDropdown = ({ User, getName, contarct, userImages }) => {
  // console.log("dtdtdtdtd", getName);

  const [logoTimer, setLogoTimer] = useState(true);

  const dispatch = useDispatch();
  const { logout, account, chainId } = useMoralis();
  const logoutDatas = () => {
    dispatch(logoutData());
    logout();
  };
  const profileImage = getName.profile;
  //console.log("chain", chainId);
  const {
    getBalance,
    data: balance,
    nativeToken,
    error,
    isLoading,
  } = useNativeBalance({ chain: "0x5" });
  // console.log("1", window.ethereum);
  const web3 = new Web3(window.ethereum);
  // console.log("web3", web3);

  // const ethBalance = web3.eth.getBalance(
  //   "0xf17bDbEaD556daF432E8D086862ec35D4A094A2E"
  // );

  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [finalBalance, setFinalBalance] = useState();

  // console.log("idddddddddddgetName", getName.getName);
  // useEffect(() => {
  //   console.log("getUser", getName.metamaskId);
  //   const metaNum = getName.metamaskId;
  //   // console.log("metaNum", metaNum);
  //   // console.log("iddddddddddd", getName.metamaskId);
  //   // console.log("idddddddddddgetName", getName.metamaskId);
  //   // console.log("metaNum", metaNum);
  //   const ethbalance = web3.eth.getBalance(metaNum).then((tt) => {
  //     let d1 = tt / 1000000000000000000;
  //     let bala = Number(d1.toString().slice(0, -11));
  //     setFinalBalance(bala);
  //   });
  // }, [getName]);

  useEffect(() => {
    idChecking();
  }, [getName]);

  const idChecking = async () => {
    const metaNum2 = User.metamaskId;
    // console.log("metaNum2", metaNum2);
    if (metaNum2) {
      const ethbalance = await web3.eth
        .getBalance(User?.metamaskId)
        .then((tt) => {
          // console.log("dracula", tt);
          let d1 = tt / 1000000000000000000;

          let bala = Number(d1.toString().slice(0, -11));
          // console.log("dragon", bala);

          setFinalBalance(bala);
        });
    }
  };
  const names = getName.name;
  // console.log("111 ===,names", names);
  const metaNum = getName.metamaskId;
  const metaNumFirst = metaNum ? metaNum.slice(0, 6) : "";
  const metaNumLast = metaNum ? metaNum.slice(-6) : "";

  setTimeout(() => {
    setLogoTimer(false);
  }, 800);

  return (
    <div className="icon-box">
      <div className="profile-box" style={{ border: "none" }}>
        {profileImage ? (
          <Image
            src={process.env.NEXT_PUBLIC_USER_AWS_URL + "/user/" + profileImage}
            alt="Images"
            layout="fixed"
            width={38}
            height={38}
          />
        ) : userImages?.user_profile_picture ? (
          <div>
            <Image
              src={
                "https://" +
                process.env.NEXT_PUBLIC_CLIENT_AWS_URL +
                "/store/" +
                userImages.storeId +
                "/" +
                userImages.user_profile_picture
              }
              // src="/images/bg/bg-image-9.jpg"
              alt="Profile image"
              // layout="fixed"
              objectFit="cover"
              width={38}
              height={38}
              // quality={100}
            />
          </div>
        ) : !logoTimer ? (
          <Image
            src={dummy}
            alt="Images"
            layout="fixed"
            width={38}
            height={38}
          />
        ) : (
          ""
        )}
      </div>
      <div className="rn-dropdown">
        <div className="rn-inner-top">
          <h4 className="title">{names}</h4>
          {/* <span>
            <Anchor path="/product">Set Display Name</Anchor>
          </span> */}
        </div>
        <div className="rn-product-inner">
          <ul className="product-list">
            <li className="single-product-list">
              <div className="thumbnail">
                <Anchor path="#">
                  <Image
                    src={eth}
                    alt="Nft Product Images"
                    layout="fixed"
                    width={50}
                    height={50}
                  />
                  {/* <i className="fab fa-ethereum"></i> */}
                </Anchor>
              </div>
              <div className="content">
                <h6 className="title">
                  <Anchor path="#">Balance</Anchor>
                </h6>
                <span className="price">{finalBalance} GOR</span>
              </div>
              <div className="button" />
            </li>
            {/* <li className="single-product-list">
                            <div className="thumbnail">
                                <Anchor path="/product">
                                    <Image
                                        src="/images/portfolio/portfolio-01.jpg"
                                        alt="Nft Product Images"
                                        layout="fixed"
                                        width={50}
                                        height={50}
                                    />
                                </Anchor>
                            </div>
                            <div className="content">
                                <h6 className="title">
                                    <Anchor path="/product">Balance</Anchor>
                                </h6>
                                <span className="price">25 ETH</span>
                            </div>
                            <div className="button" />
                        </li> */}
          </ul>
        </div>
        <div className="add-fund-button mt--20 pb--20">
          {/* <input type="text" value={text} onChange={inputHandler} /> */}

          <Anchor
            className="btn btn-primary w-100"
            path="#"
            // onClick={copyCodeToClipboard}
            style={{ color: "white" }}
          >
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            {metaNumFirst}.....{metaNumLast}
          </Anchor>
        </div>
        <ul className="list-inner">
          <li>
            <Anchor path="/author">My Profile</Anchor>
          </li>
          <li>
            <Anchor path="/edit-profile">Edit Profile</Anchor>
          </li>

          {userImages?.type === "single_store" ? (
            getName?.metamaskId === userImages?.metamaskId ? (
              <li>
                <Anchor path="/my-collections">My Collections</Anchor>
              </li>
            ) : (
              ""
            )
          ) : (
            <li>
              <Anchor path="/my-collections">My Collections</Anchor>
            </li>
          )}
          <li>
            <Anchor path="/wish-list">Wish list</Anchor>
          </li>
          {!userImages?.contactDetails ? (
            ""
          ) : (
            <li>
              <Anchor path="/contact">Contact Us</Anchor>
            </li>
          )}

          {/* // {getName?.metamaskId === userImages?.metamaskId ? (
          //   <li>
          //     <Anchor path="/my-collections">My Collections</Anchor>
          //   </li>
          // ) : (
          //   ""
          // )} */}
          {/* <li>
            <Anchor path="/connect">Manage funds</Anchor>
          </li> */}
          <li>
            <a style={{ cursor: "pointer" }} onClick={() => logoutDatas()}>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getName: state.main.getCurrentUser,
    contarct: state.main.getContract,
    userImages: state.main.getCurrentStoreData,
  };
};
export default connect(mapStateToProps)(UserDropdown);
