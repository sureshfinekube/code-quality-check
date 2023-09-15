import PropTypes from "prop-types";
import Image from "next/image";
import Button from "@ui/button";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import { HeadingType, TextType, ButtonType, ImageType } from "@utils/types";
import { connect, useSelector } from "react-redux";
// const bannerImage = getStoreImage.bannerImage;
import img from "./profile.png";
import { useState, useEffect } from "react";
import ConnectToWallet from "@components/modals/connect-wallet-modal";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const HeroArea = ({ data, getStoreImage, getUser, getStore }) => {
  // console.log("1", getStoreImage);
  const router = useRouter();
  const { authenticate, isAuthenticated, account } = useMoralis();
  // console.log("getStoredata", getStoreImage.storeContent);
  const imageBanner = getStoreImage.bannerImage;
  const storeId = getStoreImage.storeId;
  // console.log("imgg", data.images[0].src);
  const [walletmodal, setwalletmodal] = useState(false);

  const handleWalletModal = () => {
    setwalletmodal((prev) => !prev);
  };
  const loader = useSelector((state) => state.main.loader);
  const { theme } = useTheme();
  useEffect(() => {
    console.log("data?.buttons", data?.buttons);
  }, [data?.buttons]);

  useEffect(() => {
    if (isAuthenticated) {
      setwalletmodal(false);
    }
  }, [isAuthenticated]);

  const loginHandler = () => {
    if (isAuthenticated) {
      setwalletmodal(false);
      router.push("/explore");
    } else {
      setwalletmodal(true);
    }
    // if (isAuthenticated) {
    //   setwalletmodal((prev) => !prev);
    // }
    if (typeof window.ethereum !== "undefined") {
      // setwalletmodal((prev) => !prev);
      // authenticate();
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };
  console.log("getStoreImage.bannerHeading", getStoreImage);
  return (
    <div className="slider-one rn-section-gapTop">
      <div className="container">
        <div className="row row-reverce-sm align-items-center">
          <div className="col-lg-5 col-md-6 col-sm-12 mt_sm--50">
            {/*  */}
            {getStoreImage.bannerHeading &&
            getStoreImage.bannerHeading !== "undefined" ? (
              <>
                <h2
                  className="title"
                  // data-sal-delay="200"
                  // data-sal="slide-up"
                  // data-sal-duration="800"
                >
                  {getStoreImage.bannerHeading}
                </h2>
              </>
            ) : getStoreImage.bannerHeading == undefined ? (
              <Skeleton
                width={250}
                height={50}
                count={1}
                // wrapper={InlineWrapperWithMargin}
                inline
                border={"1px"}
                display={"flex"}
                lineHeight={2}
                style={{ borderRadius: "10px" }}
                // padding={"1rem"}
                // baseColor={"red"}
                // highlightColor={"yellow"}
                baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                highlightColor={
                  theme && theme === "dark" ? "#404040" : "#bfbfbf"
                }
              />
            ) : (
              <h2
                className="title"
                // data-sal-delay="200"
                // data-sal="slide-up"
                // data-sal-duration="800"
              >
                Edit Banner Heading By Navigating To The Dashboard
              </h2>
            )}

            {/* 4 */}

            {getStoreImage.storeContent ? (
              <p
                className="slide-disc"
                // data-sal-delay="300"
                //data-sal="slide-up"
                //data-sal-duration="800"
              >
                {getStoreImage.storeContent}
              </p>
            ) : getStoreImage.storeContent === undefined ? (
              <Skeleton
                width={450}
                height={50}
                count={1}
                // wrapper={InlineWrapperWithMargin}
                inline
                border={"1px"}
                display={"flex"}
                lineHeight={1}
                style={{ borderRadius: "10px", marginTop: "5px" }}
                // padding={"1rem"}
                // baseColor={"red"}
                // highlightColor={"yellow"}
                baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                highlightColor={
                  theme && theme === "dark" ? "#404040" : "#bfbfbf"
                }
              />
            ) : (
              <p
                className="slide-disc"
                //data-sal-delay="300"
                //data-sal="slide-up"
                //data-sal-duration="800"
              >
                The banner content can be changed by accessing dashboard's
                appearance section and editing in the 'banner content' tab.
              </p>
            )}

            {data?.buttons && (
              <>
                {loader && theme ? (
                  <Skeleton
                    width={140}
                    height={50}
                    count={2}
                    // wrapper={InlineWrapperWithMargin}
                    inline
                    border={"1px"}
                    display={"flex"}
                    lineHeight={2}
                    style={{
                      borderRadius: "10px",
                      marginLeft: "5px",
                      marginTop: "10px",
                    }}
                    // padding={"1rem"}
                    // baseColor={"red"}
                    // highlightColor={"yellow"}
                    baseColor={
                      theme && theme === "dark" ? "#303030" : "#dbdbdb"
                    }
                    highlightColor={
                      theme && theme === "dark" ? "#404040" : "#bfbfbf"
                    }
                  />
                ) : (
                  <div className="button-group">
                    <Button
                      //data-sal="slide-up"
                      // data-sal-duration="800"
                      onClick={() => loginHandler()}
                      style={{ margin: "7px" }}
                    >
                      Get Started
                    </Button>

                    {getStoreImage?.type === "single_store" ? (
                      getUser?.metamaskId === getStoreImage?.metamaskId ? (
                        <Button style={{ color: "white" }} path="/create">
                          Create
                        </Button>
                      ) : (
                        ""
                      )
                    ) : getStoreImage?.type === "marketplace" ? (
                      <Button style={{ color: "white" }} path="/create">
                        Create
                      </Button>
                    ) : (
                      ""
                    )}
                    {/* <button
                  type="button"
                  onClick={() => {
                    throw new Error("Sentry Frontend Error");
                  }}
                >
                  Throw error
                </button> */}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 offset-lg-1">
            {imageBanner === "false" ? (
              imageBanner && (
                <div className="slider-thumbnail">
                  <Image
                    src={img}
                    // src={
                    //   "https://"+process.env.NEXT_PUBLIC_CLIENT_AWS_URL+"/store/63078f3e47694d59b4a13ce3/user-profile-picture.png"
                    // }
                    alt="Slider Images"
                    width={585}
                    height={593}
                  />
                </div>
              )
            ) : imageBanner !== "false" && imageBanner !== undefined ? (
              <div
                className="slider-thumbnail"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                <Image
                  src={
                    "https://" +
                    process.env.NEXT_PUBLIC_CLIENT_AWS_URL +
                    "/store/" +
                    storeId +
                    "/" +
                    imageBanner
                  }
                  // src={
                  //   "https://"+process.env.NEXT_PUBLIC_CLIENT_AWS_URL+"/store/63078f3e47694d59b4a13ce3/user-profile-picture.png"
                  // }
                  alt="Banner Image"
                  width={585}
                  height={593}
                  // 1000 * 1013
                />
              </div>
            ) : imageBanner === undefined ? (
              <Skeleton
                width={585}
                height={593}
                count={1}
                // wrapper={InlineWrapperWithMargin}
                inline
                border={"1px"}
                display={"flex"}
                lineHeight={2}
                style={{ borderRadius: "10px" }}
                // padding={"1rem"}
                // baseColor={"red"}
                // highlightColor={"yellow"}
                baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                highlightColor={
                  theme && theme === "dark" ? "#404040" : "#bfbfbf"
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ConnectToWallet show={walletmodal} handleModal={handleWalletModal} />
    </div>
  );
};
HeroArea.propTypes = {
  data: PropTypes.shape({
    headings: PropTypes.arrayOf(HeadingType),
    texts: PropTypes.arrayOf(TextType),
    buttons: PropTypes.arrayOf(ButtonType),
    // images: PropTypes.arrayOf(ImageType),
  }),
};

const mapStateToProps = (state) => {
  return {
    getStoreImage: state.main.getCurrentStoreData,
    getUser: state.main.getCurrentUser,
  };
};
export default connect(mapStateToProps)(HeroArea);
