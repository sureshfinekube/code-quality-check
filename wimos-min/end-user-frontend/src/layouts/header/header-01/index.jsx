import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useMoralis } from "react-moralis";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import NotificationDropdown from "@components/notification-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import ConnectToWallet from "@components/modals/connect-wallet-modal";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import menus from "../../../data/general/menu-001.json";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import {
  loginData,
  getmyNft,
  getCurrentUser,
  getMyCollections,
  getAllStoreNfts,
  getPagesData,
  getNotificationsData,
  getNotificationsSettings,
  getSeachHistory,
  getBlogCategory,
  getSocialMedia,
  getFeeData,
  logoutData,
} from "src/redux/actions/main";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentUserData } from "src/redux/services/main";
import Web3 from "web3";
import userDropdown from "@components/user-dropdown";
import Router, { useRouter } from "next/router";
import { registerAndSubscribe } from "@utils/sw-helper";
import { io } from "socket.io-client";
import { socket } from "@utils/socket";
import { useTheme } from "next-themes";

const Header = ({ className, myStore, User, getPage, contract, isLogin }) => {
  // console.log("header-------called");
  // useEffect(() => {
  //   console.log("myStore", myStore);
  // }, [myStore]);
  const { theme } = useTheme();

  const loader = useSelector((state) => state.main.loader);

  const router = useRouter();
  const dispatch = useDispatch();
  const sticky = useSticky();
  const { offcanvas, offcanvasHandler } = useOffcanvas();
  const { search, searchHandler } = useFlyoutSearch();
  const {
    authenticate,
    isAuthenticated,
    account,
    chainId,
    logout,
    login,
    user,
  } = useMoralis();
  const [walletmodal, setwalletmodal] = useState(false);
  const [chain, setChain] = useState();
  const [chainname, setChainname] = useState();
  const handleWalletModal = () => {
    setwalletmodal((prev) => !prev);
  };
  //console.log("test", isAuthenticated, account, chainId);
  //   const { handleSubmit } = useForm();

  useEffect(() => {
    checkMeta();
    let baseurl =
      process.env.NODE_ENV === "production" ? "live-url.com" : "local-url.com";
    console.log("nodeennnv: ", process.env.NODE_ENV);
    // regServiceWorker()
    // dispatch(getAllStoreNfts());
    // send("Push Notifications", "Push notification successfully sent to the browser! Check it out!")
  }, []);

  const web3 = new Web3(Web3.givenProvider);

  const checkMeta = async () => {
    if (typeof window.ethereum !== "undefined") {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      // console.log("hj", accounts);
      if (accounts && accounts.length <= 0) {
        logout();
      }
    }
  };
  // console.log("web3", web3);

  // console.log("user", User);
  const loginHandler = () => {
    setwalletmodal(true);

    // if (typeof window.ethereum !== "undefined") {
    //   authenticate();

    // } else {
    //   window.open("https://metamask.io/download/", "_blank");
    // }ro
  };

  // useEffect(() => {
  //   console.log("ghjk");
  // }, [user]);

  useEffect(() => {
    setChain(contract.chainId);
    //console.log("contract.chainId", typeof contract.chainId);

    if (contract.chainId === "4") {
      // console.log("rb");
      setChainname("Rinkeby");
    } else if (contract.chainId === "5") {
      setChainname("Goerli");
    } else if (contract.chainId === "3") {
      setChainname("Ropsten");
    } else if (contract.chainId === "1") {
      setChainname("Mainnet");
    } else if (contract.chainId === "42") {
      setChainname("Kovan");
    } else if (contract.chainId === "11155111") {
      setChainname("Sepolia");
    }
  }, [contract]);

  const changeNetwork = async () => {
    const chainId = 5;
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Goerli",
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: {
                  name: "Goerli",
                  decimals: 18,
                  symbol: "Goerli",
                },
                rpcUrls: ["https://rpc.ankr.com/eth_goerli/"],
              },
            ],
          });
        }
      }
    }
  };

  useEffect(() => {
    if (account === null && isAuthenticated === true) {
      //console.log("test", account, isAuthenticated, user.get("ethAddress"));
      let Data = {
        metamaskId: user.get("ethAddress"),
        signature: user?.attributes.authData["moralisEth"].signature,
        msg: user?.attributes.authData["moralisEth"].data,
      };
      dispatch(loginData(Data));
    } else {
      if (chain !== undefined) {
        // console.log("hdeej");
        if (chainId !== "0x" + chain && account !== null) {
          // const notify = () => {
          //   toast.error("Please switch to " + chainname + " network");
          // };
          // notify();
          changeNetwork();

          logout();
        }
        //console.log("test", account, isAuthenticated);
        if (account !== null && isAuthenticated) {
          // var msg = user?.attributes.authData["moralisEth"].signature;
          // var signature = user?.attributes.authData["moralisEth"].data;
          // var metamaskId = account;
          let Data = {
            metamaskId: account,
            signature: user?.attributes.authData["moralisEth"].signature,
            msg: user?.attributes.authData["moralisEth"].data,
          };
          dispatch(loginData(Data));
        }
      }
    }
  }, [account, isAuthenticated, chainId, chain, user]);

  // change network start

  const initialize = () => {
    let web3;
    let polygonChainId;

    let connect = async () => {
      const { ethereum } = window;
      if (ethereum) {
        console.log("ethreum provider detected");
        await ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(ethereum);
        await switchNetwork(polygonChainId);
      }
    };

    const getCurrentChainId = async () => {
      const currentChainId = await web3.eth.getChainId();
      console.log("current chainId:", currentChainId);
      return currentChainId;
    };

    const switchNetwork = async (chainId) => {
      const currentChainId = await web3.eth.getChainId();
      if (currentChainId != chainId) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(chainId) }],
          });
          console.log(`switched to chainid : ${chainId} succesfully`);
        } catch (err) {
          console.log(
            `error occured while switching chain to chainId ${chainId}, err: ${err.message} code: ${err.code}`
          );
          if (err.code === 4902) {
            addNetwork(polygonNetwork);
          }
        }
      }
    };

    const polygonNetwork = {
      chainId: Web3.utils.toHex(polygonChainId),
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    };

    const addNetwork = async (networkDetails) => {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkDetails],
        });
      } catch (err) {
        console.log(
          `error ocuured while adding new chain with chainId:${networkDetails.chainId}, err: ${err.message}`
        );
      }
    };

    connect();
  };

  // change network end

  const [isServiceWorkerActivated, setIsServiceWorkerActivated] =
    useState(false);
  useEffect(() => {
    // console.log("oo", isLogin);
    if (isAuthenticated && isLogin) {
      setwalletmodal(false);
      getUserData();

      // Registering push notification
      registerAndSubscribe(User.id);
      setIsServiceWorkerActivated(true);
    }
  }, [isAuthenticated, isLogin]);

  const getUserData = () => {
    dispatch(getmyNft());
    dispatch(getCurrentUser());
    dispatch(getSocialMedia());
    dispatch(getMyCollections());
    dispatch(getSeachHistory());
    dispatch(getNotificationsData());
    dispatch(getNotificationsSettings());
    dispatch(getFeeData());
  };

  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  useEffect(() => {
    dispatch(getPagesData());
    dispatch(getBlogCategory());
  }, []);

  useEffect(() => {
    const { ethereum } = window;
    ethereum?.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!
      dispatch(logoutData());
      logout();
    });
  }, []);
  // useEffect(() => {/21

  //   dispatch(getContract());
  //   dispatch(getCollection());
  //   dispatch(getAllStoreNfts());
  //   dispatch(getCurrentStore());
  //   dispatch(getTopCollections());
  //   dispatch(getTopNfts());
  // }, []);
  // console.log("myStore", myStore);
  // const profileLogo = myStore.storeLogo;
  // const profileName = myStore.name;
  // const storeId = myStore.storeId;
  // console.log("menus", getPage?.length);
  let menuDatas = menuData;
  let menusdata = menus;
  let submenus;

  if (getPage?.length > 0) {
    submenus = getPage.map((pro) => ({
      id: pro.id,
      text: pro.name,
      path: `/pages/${pro.id}`,
    }));

    menuDatas = [
      ...menuData,
      {
        id: 6,
        text: "Pages",
        path: "#!",
        submenu: submenus,
      },
    ];
    menusdata = [
      ...menus,
      {
        id: 5,
        text: "Pages",
        path: "#!",
        submenu: submenus,
      },
    ];
  }
  // console.log("menusdata", menusdata);
  // menuData?.map((menu) => {
  //   // console.log("123456789asdf", menu);
  //   if (getPage?.length > 0) {
  //     // if (menu.text === "Pages") {
  //     //   getPage?.map((pro) => {
  //     //     menu.submenu = [
  //     //       {
  //     //         id: pro.id,
  //     //         text: pro.name,
  //     //         path: `/pages/${pro.id}`,
  //     //       },
  //     //     ];
  //     //   });
  //     // }

  //   } else {
  //     if (menu.text === "Pages") {
  //       menu.text = "";
  //     }
  //   }
  // });

  // const socket = io("http://localhost:8080");

  // useEffect(() => {
  //   socket.on('sendNotify', (rData) => {
  //     console.log('rDDD',rData)
  //     console.count()
  //   })
  // })
  // const [notifications, setNotifications] = useState([])

  // socket.on('receiveNotifications', request => {
  //   setNotifications([...notifications, request])
  // })

  const [connected, setConnected] = useState(false);
  // IT IS HERE
  useEffect(() => {
    const eventHandler = () => setConnected(true);
    if (!connected && User?.id) {
      console.log("getting to create room");
      socket.emit("join", { sId: User?.id }, eventHandler);
    }
    // unsubscribe from event for preventing memory leaks
    // return () => {
    //   socket.off("join", eventHandler);
    // };
  }, [User]);

  return (
    <>
      <header
        className={clsx(
          "rn-header haeder-default black-logo-version header--fixed header--sticky",
          sticky && "sticky",
          className
        )}
      >
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <Logo
                logo={myStore?.storeLogo}
                logoName={myStore?.name}
                storeId={myStore?.storeId}
              />

              <div className="mainmenu-wrapper">
                <nav
                  id="sideNav"
                  className="mainmenu-nav d-none d-xl-block input-box"
                >
                  <MainMenu menu={menuDatas} menus={menusdata} />
                </nav>
              </div>
            </div>
            <div className="header-right">
              <div className="setting-option d-none d-lg-block">
                <SearchForm />
              </div>
              <div className="setting-option rn-icon-list d-block d-lg-none">
                <div className="icon-box search-mobile-icon">
                  <button
                    type="button"
                    aria-label="Click here to open search form"
                    onClick={searchHandler}
                  >
                    <i className="feather-search" />
                  </button>
                </div>
                <FlyoutSearchForm isOpen={search} />
              </div>
              {loader ? (
                <div style={{ marginRight: "2rem" }}>
                  {theme && (
                    <Skeleton
                      width={40}
                      height={40}
                      count={1}
                      inline
                      style={{ paddingLeft: "5px" }}
                      border={"1px"}
                      display={"flex"}
                      lineHeight={2}
                      padding={"1rem"}
                      borderRadius={"2rem"}
                      // baseColor={"red"}
                      // highlightColor={"yellow"}
                      baseColor={
                        theme && theme === "dark" ? "#303030" : "#dbdbdb"
                      }
                      highlightColor={
                        theme && theme === "dark" ? "#404040" : "#bfbfbf"
                      }
                    />
                  )}
                </div>
              ) : (
                <>
                  {isAuthenticated ? (
                    <div className="setting-option rn-icon-list user-account">
                      <UserDropdown User={User} />
                    </div>
                  ) : (
                    <div className="setting-option header-btn">
                      <div className="icon-box">
                        <Button
                          color="primary"
                          className="connectBtn"
                          size="small"
                          onClick={() => loginHandler()}
                        >
                          Wallet Connect
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
              {loader ? (
                <div style={{ marginRight: "2rem" }}>
                  {theme && (
                    <Skeleton
                      width={40}
                      height={40}
                      count={1}
                      // wrapper={InlineWrapperWithMargin}
                      inline
                      border={"1px"}
                      display={"flex"}
                      lineHeight={2}
                      padding={"1rem"}
                      borderRadius={"2rem"}
                      circle={"true"}
                      // className="rounded-circle"
                      // baseColor={"red"}
                      // highlightColor={"yellow"}
                      baseColor={
                        theme && theme === "dark" ? "#303030" : "#dbdbdb"
                      }
                      highlightColor={
                        theme && theme === "dark" ? "#404040" : "#bfbfbf"
                      }
                    />
                  )}
                </div>
              ) : (
                <>
                  {isAuthenticated && (
                    <div
                      className="setting-option rn-icon-list user-account notification-badge "
                      style={{
                        // border: "1px solid rgb(211 214 215)",
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                      }}
                    >
                      <NotificationDropdown />
                    </div>
                  )}
                </>
              )}

              {/* <div className="icon-box">
                  <Anchor
                    path={headerData.activity_link}
                    className="notification "
                  >
                    <i className="feather-bell" />
                    <span className="badge">1</span>
                  </Anchor>
                </div> */}
              <div className="setting-option mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <BurgerButton onClick={offcanvasHandler} />
                </div>
              </div>
              {loader ? (
                <div className="" style={{ border: "none" }}>
                  {theme && (
                    <Skeleton
                      width={40}
                      height={40}
                      count={1}
                      // wrapper={InlineWrapperWithMargin}
                      inline
                      border={"1px"}
                      display={"flex"}
                      lineHeight={2}
                      padding={"1rem"}
                      // baseColor={"red"}
                      borderRadius={"2rem"}
                      circle={"true"}
                      // highlightColor={"yellow"}
                      baseColor={
                        theme && theme === "dark" ? "#303030" : "#dbdbdb"
                      }
                      highlightColor={
                        theme && theme === "dark" ? "#404040" : "#bfbfbf"
                      }
                    />
                  )}
                </div>
              ) : (
                <div id="my_switcher" className="setting-option my_switcher">
                  <ColorSwitcher />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={offcanvas}
        onClick={offcanvasHandler}
        menu={menuData}
        logo={myStore?.storeLogo}
        logoName={myStore?.name}
        storeId={myStore?.storeId}
      />
      <ConnectToWallet show={walletmodal} handleModal={handleWalletModal} />
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    myStore: state.main.getCurrentStoreData,
    isLogin: state.main.islogin,
    User: state.main.getCurrentUser,
    getPage: state.main.getPages.pages,
    contract: state.main.getContract,
  };
};

export default connect(mapStateToProps)(Header);
