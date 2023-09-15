import PropTypes from "prop-types";
import clsx from "clsx";
import LogoWidget from "@widgets/logo-widget";
import NewsletterWidget from "@widgets/newsletter-widget";
import QuicklinkWidget from "@widgets/quicklink-widget";
import InformationWidget from "@widgets/information-widget";
import SoldOutWidget from "@widgets/sold-out-widget";
import FooterLinkWidget from "@widgets/footer-link-widget";
import SocialWidget from "@widgets/social-widget";
import { connect, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";
// Demo data
import footerData from "../../../data/general/footer-01.json";
import contactData from "../../../data/general/contact.json";
import { useMoralis } from "react-moralis";
import ConnectToWallet from "@components/modals/connect-wallet-modal";
import { useState, useEffect } from "react";

const Footer = ({ space, className, myStore }) => {
  const profileLogo = myStore.storeLogo;
  const profileName = myStore.name;
  const storeId = myStore.storeId;
  const socialMediaData = useSelector((state) => state.main.getSocailMedia);
  const loader = useSelector((state) => state.main.loader);
  const { theme } = useTheme();
  const { authenticate, isAuthenticated, account } = useMoralis();
  const [walletmodal, setwalletmodal] = useState(false);
  // const handleWalletModal = () => {
  //   setwalletmodal((prev) => !prev);
  // };
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setwalletmodal(false);
  //   }
  // }, [isAuthenticated]);

  // let footerData = "";
  // useEffect(() => {
  //   console.log("footerData1==>", footerData);
  //   footerData["information-widget"].menu = [];
  //   console.log("footerData==>", footerData);
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      footerData["information-widget"].menu = [
        {
          id: 1,
          text: "Profile",
          path: "/author",
        },
        {
          id: 2,
          text: "Edit Profile",
          path: "/edit-profile",
        },
        {
          id: 3,
          text: "My Collections",
          path: "/my-collections",
        },
      ];
    } else {
      footerData["information-widget"].menu = [
        {
          id: 1,
          text: "View NFTs",
          path: "/explore",
        },
      ];
    }
  }, [isAuthenticated]);

  return (
    <>
      {/* <ConnectToWallet show={walletmodal} handleModal={handleWalletModal} /> */}

      <div
        className={clsx(
          "rn-footer-one bg-color--1",
          space === 1 && "rn-section-gap mt--100 mt_md--80 mt_sm--80",
          space === 2 && "rn-section-gap",
          className
        )}
      >
        <div className="container">
          {/* style={{ marginBottom: "-60px" }} */}
          <div className="row gx-5">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="widget-content-wrapper">
                <LogoWidget
                  data={footerData["logo-widget"]}
                  message={myStore.footerContent}
                  //   logo={profileLogo}
                  //   logoName={profileName}
                  //   storeId={storeId}
                />
                {/* <NewsletterWidget data={footerData["newsletter-widget"]} /> */}
              </div>
            </div>
            {loader && theme ? (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_mobile--40">
                <Skeleton
                  width={300}
                  height={30}
                  count={5}
                  // wrapper={InlineWrapperWithMargin}
                  inline
                  border={"1px"}
                  style={{ borderRadius: "10px" }}
                  display={"flex"}
                  lineHeight={2}
                  padding={"1rem"}
                  // baseColor={"red"}
                  // highlightColor={"yellow"}
                  baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                  highlightColor={
                    theme && theme === "dark" ? "#404040" : "#bfbfbf"
                  }
                />
              </div>
            ) : (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_mobile--40">
                <QuicklinkWidget
                  data={footerData["quicklink-widget"]}
                  store={myStore}
                />
              </div>
            )}

            {loader && theme ? (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
                <Skeleton
                  width={300}
                  height={30}
                  count={5}
                  // wrapper={InlineWrapperWithMargin}
                  inline
                  border={"1px"}
                  display={"flex"}
                  lineHeight={2}
                  padding={"1rem"}
                  style={{ borderRadius: "10px" }}
                  // baseColor={"red"}
                  // highlightColor={"yellow"}
                  baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                  highlightColor={
                    theme && theme === "dark" ? "#404040" : "#bfbfbf"
                  }
                />
              </div>
            ) : (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
                <InformationWidget data={footerData["information-widget"]} />
              </div>
            )}
            {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
                        <SoldOutWidget data={footerData["soldout-widget"]} />
                    </div> */}
          </div>
        </div>
      </div>
      <div className="copy-right-one ptb--20 bg-color--1">
        <div className="container">
          <div className="row align-items-center">
            {loader && theme ? (
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="copyright-left">
                  <Skeleton
                    width={250}
                    height={30}
                    count={1}
                    // wrapper={InlineWrapperWithMargin}
                    inline
                    border={"1px"}
                    display={"flex"}
                    lineHeight={2}
                    padding={"1rem"}
                    style={{ borderRadius: "10px" }}
                    // baseColor={"red"}
                    // highlightColor={"yellow"}
                    baseColor={
                      theme && theme === "dark" ? "#303030" : "#dbdbdb"
                    }
                    highlightColor={
                      theme && theme === "dark" ? "#404040" : "#bfbfbf"
                    }
                  />
                </div>{" "}
              </div>
            ) : (
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="copyright-left">
                  <span>©2022 {myStore?.name}, All rights reserved</span>
                  {/* <FooterLinkWidget data={footerData["footer-link-widget"]} /> */}
                </div>
              </div>
            )}

            {loader && theme ? (
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="copyright-right">
                  <Skeleton
                    width={40}
                    height={40}
                    count={2}
                    // wrapper={InlineWrapperWithMargin}
                    inline
                    border={"1px"}
                    display={"flex"}
                    lineHeight={2}
                    padding={"1rem"}
                    style={{ borderRadius: "10px", marginLeft: "5px" }}
                    // baseColor={"red"}
                    // highlightColor={"yellow"}
                    baseColor={
                      theme && theme === "dark" ? "#303030" : "#dbdbdb"
                    }
                    highlightColor={
                      theme && theme === "dark" ? "#404040" : "#bfbfbf"
                    }
                  />
                </div>{" "}
              </div>
            ) : (
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="copyright-right">
                  <SocialWidget socials={socialMediaData?.socialMedia} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
Footer.propTypes = {
  space: PropTypes.oneOf([1, 2]),
  className: PropTypes.string,
};

Footer.defaultProps = {
  space: 1,
};

const mapStateToProps = (state) => {
  return {
    myStore: state.main.getCurrentStoreData,
  };
};

export default connect(mapStateToProps)(Footer);
