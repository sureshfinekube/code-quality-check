import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { ImageType } from "@utils/types";
import ShareModal from "@components/modals/share-modal";
import Button from "@ui/button";
import { connect, useSelector } from "react-redux";
import Anchor from "@ui/anchor";
import ShareDropdownProfile from "@components/share-dropdown-profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postFollow, postUnFollow } from "src/redux/actions/main";
import {
  getCurrentUser,
  getUserNFT,
  getUserInfo,
  getCurrentStore,
} from "src/redux/actions/main";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";
import { useMoralis } from "react-moralis";
import ConnectToWallet from "@components/modals/connect-wallet-modal";

const AuthorIntroArea = ({
  className,
  space,
  data,
  getName,
  getMyId,
  userId,
  userImages,
  secondUserId,
  getUsersInfo,
  userData,
  ownerDetails,
  loaderData,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
  const bannerImage = getName.cover;
  const profileImage = getName.profile;
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.main.loader);
  const { theme } = useTheme();
  const [isFollowButtonActive, setIsFollowButtonActive] = useState(true);
  const [followActiveToggler, setFollowActiveToggler] = useState(true);
  const [isUnfollowButtonActive, setIsUnfollowButtonActive] = useState(true);
  const [unfollowActiveToggler, setUnfollowActiveToggler] = useState(true);
  const { user, isAuthenticated, authenticate } = useMoralis();

  // console.log("ownerDetails   +++", ownerDetails);
  // console.log("userId  data +++", data);
  // console.log("getMyId   +++", getMyId);

  // console.log("getUsersInfo+++", getUsersInfo);
  // userImages. user_cover_picture
  // getName.name =
  // getName.name.length > 15 ? getName.name.slice(0, 13) + "..." : getName.name;

  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(window.location.href);
  }, []);

  // useEffect(() => {
  //   console.log("theme", theme);
  //   console.log("loader", loader);
  // }, [theme, loader]);

  // useEffect(() => {
  //   console.log("profileImage-->", profileImage);
  //   console.log("bannerImage-->", bannerImage);
  //   console.log("getUsersInfo-->", getUsersInfo);
  //   console.log("ownerDetails-->", ownerDetails);
  //   console.log("userData-->", userData);
  //   console.log("getName-->", getName);
  //   console.log("getMyId-->", getMyId);
  // }, [profileImage, bannerImage, getName, getUsersInfo, ownerDetails]);

  useEffect(() => {
    // console.log("uiui", isShareModalOpen);
  }, [isShareModalOpen]);

  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFollowButtonActive(true), 1000);
    return () => clearTimeout(timer);
  }, [followActiveToggler]);

  useEffect(() => {
    const timer = setTimeout(() => setIsUnfollowButtonActive(true), 1000);
    return () => clearTimeout(timer);
  }, [unfollowActiveToggler]);

  const [walletmodal, setwalletmodal] = useState(false);
  const handleWalletModal = () => {
    setwalletmodal((prev) => !prev);
  };
  useEffect(() => {
    if (isAuthenticated) {
      setwalletmodal(false);
    }
  }, [isAuthenticated]);
  const loginHandler = () => {
    if (isAuthenticated) {
      setwalletmodal(false);
      // router.push("/explore");
    } else {
      setwalletmodal(true);
    }

    if (typeof window.ethereum !== "undefined") {
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const onFollow = () => {
    if (isAuthenticated) {
      setwalletmodal(false);
      const Data = {
        userId: getName?.id,
      };
      setIsFollowButtonActive(false);
      setFollowActiveToggler(!followActiveToggler);
      dispatch(postFollow(Data, getName?.id, true));
    } else {
      loginHandler();
    }
  };

  const onUnFollow = () => {
    if (isAuthenticated) {
      setwalletmodal(false);
      const Data = {
        userId: getName?.id,
      };
      setIsUnfollowButtonActive(false);
      setUnfollowActiveToggler(!unfollowActiveToggler);
      dispatch(postUnFollow(Data, getName?.id, true));
    } else {
      loginHandler();
    }
  };

  const handlerRefersh = () => {
    if (currentPage.includes("author")) {
      dispatch(getCurrentUser());
    } else {
      dispatch(getUserInfo(secondUserId));
    }
    // dispatch(getCurrentStore());

    dispatch(getUserNFT(secondUserId));
    const notify = () =>
      toast("Refershing user profile...it may take a few mintues");
    notify();
  };

  const handleClick = (value) => {
    navigator.clipboard.writeText(value);

    const notify = () => toast("Copied");
    notify();
  };

  return (
    <>
      <ShareModal
        show={isShareModalOpen}
        handleModal={shareModalHandler}
        isShareModalOpen={isShareModalOpen}
      />
      <div>
        {loaderData ? (
          <div style={{ textAlign: "center" }}>
            <div className="main-loader" style={{ height: "550px" }}>
              {" "}
            </div>
          </div>
        ) : (
          <>
            <div
              // className={
              //   loader && theme
              //     ? "rn-author-bg-area position-relative ptb--110"
              //     : "rn-author-bg-area position-relative ptb--150"
              // }
              className="rn-author-bg-area position-relative ptb--150"
            >
              {bannerImage ? (
                // bannerImage && (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_USER_AWS_URL +
                    "/user/" +
                    bannerImage
                  }
                  // src="/images/bg/bg-image-9.jpg"
                  alt="Banner image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  // height="338px"
                  // style={{ height: "338px",width:"" }}
                />
              ) : // )
              userImages?.user_cover_picture ? (
                <Image
                  src={
                    "https://" +
                    process.env.NEXT_PUBLIC_CLIENT_AWS_URL +
                    "/store/" +
                    userImages.storeId +
                    "/" +
                    userImages.user_cover_picture
                  }
                  // src="/images/bg/bg-image-9.jpg"
                  alt="Banner image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  style={{ height: "338px" }}
                />
              ) : (
                // ) : bannerImage === undefined && !bannerImage && theme ? (
                //   <Skeleton
                //     width={1920}
                //     height={1000}
                //     count={1}
                //     // wrapper={InlineWrapperWithMargin}
                //     inline
                //     border={"1px"}
                //     display={"flex"}
                //     lineHeight={2}
                //     style={{
                //       borderRadius: "10px",
                //       // padding: "0px !important",
                //       // marginLeft: "116px",
                //     }}
                //     // padding={"1rem"}
                //     // baseColor={"red"}
                //     // highlightColor={"yellow"}
                //     baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                //     highlightColor={
                //       theme && theme === "dark" ? "#404040" : "#bfbfbf"
                //     }
                //   />
                // )
                // : loaderData ? (
                //   <Skeleton
                //     width={1920}
                //     height={1000}
                //     count={1}
                //     // wrapper={InlineWrapperWithMargin}
                //     inline
                //     border={"1px"}
                //     display={"flex"}
                //     lineHeight={2}
                //     style={{
                //       borderRadius: "10px",
                //       // padding: "0px !important",
                //       // marginLeft: "116px",
                //     }}
                //     // padding={"1rem"}
                //     // baseColor={"red"}
                //     // highlightColor={"yellow"}
                //     baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                //     highlightColor={theme && theme === "dark" ? "#404040" : "#bfbfbf"}
                //   />
                <Image
                  // src={
                  //   process.env.NEXT_PUBLIC_USER_AWS_URL+"+user/" + bannerImage
                  // }
                  src="/images/bg/bg-image-9.jpg"
                  alt="Banner image"
                  layout="fill"
                  objectFit="cover"
                  // quality={100}
                  height={1000}
                  width={1920}
                  // style={{ height: "338px" }}
                />
              )}
            </div>

            <div
              className={clsx(
                "rn-author-area",
                space === 1 && "mb--30 mt_dec--145",
                className
              )}
            >
              <div className="container">
                <div className="row padding-tb-50 align-items-center d-flex">
                  <div className="col-lg-12">
                    <div className="author-wrapper">
                      <div className="author-inner">
                        {/* {loader && theme ? (
                    <Skeleton
                      width={140}
                      height={140}
                      count={1}
                      // wrapper={InlineWrapperWithMargin}
                      inline
                      border={"1px"}
                      display={"flex"}
                      lineHeight={2}
                      style={{
                        borderRadius: "10px",
                        // marginLeft: "116px",
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
                  ) : ( */}
                        <>
                          {profileImage ? (
                            profileImage && (
                              <div className="user-thumbnail">
                                <Image
                                  // src={data.image.src}
                                  src={
                                    process.env.NEXT_PUBLIC_USER_AWS_URL +
                                    "/user/" +
                                    profileImage
                                  }
                                  alt={profileImage?.alt || "Profile image"}
                                  width={140}
                                  height={140}
                                  layout="fixed"
                                  className="author_profile"
                                />
                              </div>
                            )
                          ) : userImages?.user_profile_picture ? (
                            <div className="user-thumbnail">
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
                                layout="fixed"
                                objectFit="cover"
                                width={140}
                                height={140}
                                quality={100}
                              />
                            </div>
                          ) : profileImage === undefined && theme ? (
                            <div
                              className="user-thumbnail"
                              style={{
                                borderRadius: "10px",
                              }}
                            >
                              <Skeleton
                                width={140}
                                height={140}
                                count={1}
                                // wrapper={InlineWrapperWithMargin}
                                inline
                                border={"1px"}
                                display={"flex"}
                                lineHeight={2}
                                style={{
                                  borderRadius: "10px",
                                  // marginLeft: "116px",
                                }}
                                // padding={"1rem"}
                                // baseColor={"red"}
                                // highlightColor={"yellow"}
                                baseColor={
                                  theme && theme === "dark"
                                    ? "#303030"
                                    : "#dbdbdb"
                                }
                                highlightColor={
                                  theme && theme === "dark"
                                    ? "#404040"
                                    : "#bfbfbf"
                                }
                              />
                            </div>
                          ) : (
                            // ) : loaderData ? (
                            //   <div
                            //     className="user-thumbnail"
                            //     style={{
                            //       borderRadius: "10px",
                            //     }}
                            //   >
                            //     <Skeleton
                            //       width={140}
                            //       height={140}
                            //       count={1}
                            //       // wrapper={InlineWrapperWithMargin}
                            //       inline
                            //       border={"1px"}
                            //       display={"flex"}
                            //       lineHeight={2}
                            //       style={{
                            //         borderRadius: "10px",
                            //         // marginLeft: "116px",
                            //       }}
                            //       // padding={"1rem"}
                            //       // baseColor={"red"}
                            //       // highlightColor={"yellow"}
                            //       baseColor={
                            //         theme && theme === "dark" ? "#303030" : "#dbdbdb"
                            //       }
                            //       highlightColor={
                            //         theme && theme === "dark" ? "#404040" : "#bfbfbf"
                            //       }
                            //     />
                            //   </div>
                            <div className="user-thumbnail">
                              <Image
                                src={data.image.src}
                                // src={
                                //   process.env.NEXT_PUBLIC_USER_AWS_URL+"+user/" +
                                //   profileImage
                                // }
                                alt={profileImage?.alt || "Profile image"}
                                width={140}
                                height={140}
                                layout="fixed"
                              />
                            </div>
                          )}
                        </>
                        {/* // )} */}
                        <div className="rn-author-info-content">
                          {loader && theme ? (
                            <h4
                              className="title"
                              style={{ wordWrap: "break-word" }}
                            >
                              <Skeleton
                                width={280}
                                height={30}
                                count={1}
                                // wrapper={InlineWrapperWithMargin}
                                style={{ borderRadius: "10px" }}
                                inline
                                border={"1px"}
                                display={"flex"}
                                lineHeight={2}
                                padding={"1rem"}
                                // baseColor={"red"}
                                // highlightColor={"yellow"}
                                baseColor={
                                  theme && theme === "dark"
                                    ? "#303030"
                                    : "#dbdbdb"
                                }
                                highlightColor={
                                  theme && theme === "dark"
                                    ? "#404040"
                                    : "#bfbfbf"
                                }
                              />{" "}
                            </h4>
                          ) : (
                            // ) : !getName.name ? (
                            //   <h4 className="title" style={{ wordWrap: "break-word" }}>
                            //     <Skeleton
                            //       width={280}
                            //       height={30}
                            //       count={1}
                            //       // wrapper={InlineWrapperWithMargin}
                            //       style={{ borderRadius: "10px" }}
                            //       inline
                            //       border={"1px"}
                            //       display={"flex"}
                            //       lineHeight={2}
                            //       padding={"1rem"}
                            //       // baseColor={"red"}
                            //       // highlightColor={"yellow"}
                            //       baseColor={
                            //         theme && theme === "dark" ? "#303030" : "#dbdbdb"
                            //       }
                            //       highlightColor={
                            //         theme && theme === "dark" ? "#404040" : "#bfbfbf"
                            //       }
                            //     />{" "}
                            //   </h4>
                            // ) : loaderData ? (
                            //   <h4 className="title" style={{ wordWrap: "break-word" }}>
                            //     <Skeleton
                            //       width={280}
                            //       height={30}
                            //       count={1}
                            //       // wrapper={InlineWrapperWithMargin}
                            //       style={{ borderRadius: "10px" }}
                            //       inline
                            //       border={"1px"}
                            //       display={"flex"}
                            //       lineHeight={2}
                            //       padding={"1rem"}
                            //       // baseColor={"red"}
                            //       // highlightColor={"yellow"}
                            //       baseColor={
                            //         theme && theme === "dark" ? "#303030" : "#dbdbdb"
                            //       }
                            //       highlightColor={
                            //         theme && theme === "dark" ? "#404040" : "#bfbfbf"
                            //       }
                            //     />{" "}
                            //   </h4>
                            <h4
                              className="title"
                              style={{ wordWrap: "break-word" }}
                            >
                              {getName.name}
                            </h4>
                          )}
                          {/* <h5 className="title">{getName.username}</h5> */}
                          {/* <h6 className="email">{getName.email}</h6> */}
                          {loader && theme ? (
                            <p
                              style={{
                                wordWrap: "break-word",
                                marginBottom: "13px",
                                fontSize: "15px",
                              }}
                            >
                              <Skeleton
                                width={380}
                                height={30}
                                count={1}
                                style={{ borderRadius: "10px" }}
                                // wrapper={InlineWrapperWithMargin}
                                inline
                                border={"1px"}
                                display={"flex"}
                                lineHeight={2}
                                padding={"1rem"}
                                // baseColor={"red"}
                                // highlightColor={"yellow"}
                                baseColor={
                                  theme && theme === "dark"
                                    ? "#303030"
                                    : "#dbdbdb"
                                }
                                highlightColor={
                                  theme && theme === "dark"
                                    ? "#404040"
                                    : "#bfbfbf"
                                }
                              />{" "}
                            </p>
                          ) : (
                            // ) : loaderData ? (
                            //   <p
                            //     style={{
                            //       wordWrap: "break-word",
                            //       marginBottom: "13px",
                            //       fontSize: "15px",
                            //     }}
                            //   >
                            //     <Skeleton
                            //       width={380}
                            //       height={30}
                            //       count={1}
                            //       style={{ borderRadius: "10px" }}
                            //       // wrapper={InlineWrapperWithMargin}
                            //       inline
                            //       border={"1px"}
                            //       display={"flex"}
                            //       lineHeight={2}
                            //       padding={"1rem"}
                            //       // baseColor={"red"}
                            //       // highlightColor={"yellow"}
                            //       baseColor={
                            //         theme && theme === "dark" ? "#303030" : "#dbdbdb"
                            //       }
                            //       highlightColor={
                            //         theme && theme === "dark" ? "#404040" : "#bfbfbf"
                            //       }
                            //     />{" "}
                            //   </p>
                            <p
                              style={{
                                wordWrap: "break-word",
                                marginBottom: "13px",
                                fontSize: "15px",
                              }}
                            >
                              {userData?.id === getName?.id ? (
                                <>
                                  <a
                                    href={`https://goerli.etherscan.io/address/${getMyId.metamaskId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {getMyId.metamaskId}{" "}
                                  </a>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-files"
                                    viewBox="0 0 16 16"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleClick(getMyId.metamaskId);
                                    }}
                                  >
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <a
                                    href={`https://goerli.etherscan.io/address/${getUsersInfo?.metamaskId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {getUsersInfo?.metamaskId}{" "}
                                  </a>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-files"
                                    viewBox="0 0 16 16"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleClick(getUsersInfo.metamaskId);
                                    }}
                                  >
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                                  </svg>
                                </>
                              )}{" "}
                            </p>
                          )}
                          {/* <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="social-follw"
                    >
                      <i className="feather-twitter" />
                      <span className="user-name">{data.twitter}</span>
                    </a> */}
                          <div className="follow-area">
                            {loader && theme ? (
                              <p
                                style={{
                                  wordWrap: "break-word",
                                  marginBottom: "13px",
                                  fontSize: "15px",
                                }}
                              >
                                <Skeleton
                                  width={150}
                                  height={30}
                                  count={2}
                                  // wrapper={InlineWrapperWithMargin}
                                  inline
                                  style={{
                                    borderRadius: "10px",
                                    marginLeft: "5px",
                                  }}
                                  border={"1px"}
                                  display={"flex"}
                                  lineHeight={2}
                                  padding={"1rem"}
                                  // baseColor={"red"}
                                  // highlightColor={"yellow"}
                                  baseColor={
                                    theme && theme === "dark"
                                      ? "#303030"
                                      : "#dbdbdb"
                                  }
                                  highlightColor={
                                    theme && theme === "dark"
                                      ? "#404040"
                                      : "#bfbfbf"
                                  }
                                />
                              </p>
                            ) : (
                              // ) : loaderData ? (
                              //   <p
                              //     style={{
                              //       wordWrap: "break-word",
                              //       marginBottom: "13px",
                              //       fontSize: "15px",
                              //     }}
                              //   >
                              //     <Skeleton
                              //       width={150}
                              //       height={30}
                              //       count={2}
                              //       // wrapper={InlineWrapperWithMargin}
                              //       inline
                              //       style={{ borderRadius: "10px", marginLeft: "5px" }}
                              //       border={"1px"}
                              //       display={"flex"}
                              //       lineHeight={2}
                              //       padding={"1rem"}
                              //       // baseColor={"red"}
                              //       // highlightColor={"yellow"}
                              //       baseColor={
                              //         theme && theme === "dark" ? "#303030" : "#dbdbdb"
                              //       }
                              //       highlightColor={
                              //         theme && theme === "dark" ? "#404040" : "#bfbfbf"
                              //       }
                              //     />
                              //   </p>
                              <p
                                style={{
                                  wordWrap: "break-word",
                                  marginBottom: "13px",
                                  fontSize: "15px",
                                  display: "flex",
                                }}
                              >
                                <div className="follow followers">
                                  {currentPage.includes("author") ? (
                                    <span>
                                      {getMyId?.follower_count
                                        ? getMyId?.follower_count
                                        : 0}{" "}
                                      {/* <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="color-body"
                          > */}
                                      followers
                                      {/* </a> */}
                                    </span>
                                  ) : (
                                    <span>
                                      {getUsersInfo?.follower_count
                                        ? getUsersInfo?.follower_count
                                        : 0}{" "}
                                      {/* <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="color-body"
                          > */}
                                      followers
                                      {/* </a> */}
                                    </span>
                                  )}
                                </div>
                                <div className="follow following">
                                  {currentPage.includes("author") ? (
                                    <span>
                                      {getMyId?.following_count
                                        ? getMyId?.following_count
                                        : 0}{" "}
                                      {/* <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="color-body"
                          > */}
                                      following
                                      {/* </a> */}
                                    </span>
                                  ) : (
                                    <span>
                                      {getUsersInfo?.following_count
                                        ? getUsersInfo?.following_count
                                        : 0}{" "}
                                      {/* <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="color-body"
                          > */}
                                      following
                                      {/* </a> */}
                                    </span>
                                  )}
                                </div>
                              </p>
                            )}
                          </div>
                          <br />
                          {loader && theme ? (
                            <div
                              className="author-button-area"
                              style={{ marginTop: "0px" }}
                            >
                              {" "}
                              <Skeleton
                                width={80}
                                height={30}
                                count={4}
                                // wrapper={InlineWrapperWithMargin}
                                inline
                                style={{
                                  borderRadius: "10px",
                                  marginLeft: "5px",
                                }}
                                border={"1px"}
                                display={"flex"}
                                lineHeight={2}
                                padding={"1rem"}
                                // baseColor={"red"}
                                // highlightColor={"yellow"}
                                baseColor={
                                  theme && theme === "dark"
                                    ? "#303030"
                                    : "#dbdbdb"
                                }
                                highlightColor={
                                  theme && theme === "dark"
                                    ? "#404040"
                                    : "#bfbfbf"
                                }
                              />
                            </div>
                          ) : (
                            // ) : loaderData ? (
                            //   <div
                            //     className="author-button-area"
                            //     style={{ marginTop: "0px" }}
                            //   >
                            //     {" "}
                            //     <Skeleton
                            //       width={80}
                            //       height={30}
                            //       count={4}
                            //       // wrapper={InlineWrapperWithMargin}
                            //       inline
                            //       style={{ borderRadius: "10px", marginLeft: "5px" }}
                            //       border={"1px"}
                            //       display={"flex"}
                            //       lineHeight={2}
                            //       padding={"1rem"}
                            //       // baseColor={"red"}
                            //       // highlightColor={"yellow"}
                            //       baseColor={
                            //         theme && theme === "dark" ? "#303030" : "#dbdbdb"
                            //       }
                            //       highlightColor={
                            //         theme && theme === "dark" ? "#404040" : "#bfbfbf"
                            //       }
                            //     />
                            //   </div>
                            <>
                              {getName.id === userId ? (
                                <div
                                  className="author-button-area"
                                  style={{ marginTop: "0px" }}
                                >
                                  {/* <span className="btn at-follw follow-button">
                          <i className="feather-user-plus" />
                          Follow
                        </span> */}
                                  <button
                                    type="button"
                                    className="btn at-follw share-button"
                                    onClick={shareModalHandler}
                                  >
                                    <i className="feather-share-2" />
                                  </button>

                                  <div
                                    className="btn at-follw share-button"
                                    onClick={handlerRefersh}
                                    // style={{ marginLeft: "15px" }}
                                  >
                                    <i className="feather-refresh-cw" />
                                  </div>

                                  {/* <div
                          className="count at-follw at-follw2"
                        >
                          <ShareDropdownProfile />
                        </div> */}
                                  <Anchor
                                    path="/edit-profile"
                                    className="btn at-follw follow-button edit-btn"
                                  >
                                    <i className="feather feather-edit" />
                                  </Anchor>
                                </div>
                              ) : getName.id != userId ? (
                                <div
                                  className="author-button-area"
                                  style={{ marginTop: "0px" }}
                                >
                                  {getUsersInfo?.isFollowing === true ? (
                                    <span
                                      className="btn at-follw follow-button"
                                      onClick={
                                        isUnfollowButtonActive
                                          ? onUnFollow
                                          : () => {}
                                      }
                                      style={{
                                        background: "#bd3bb1",
                                        fontSize: "15px",
                                        color: "white",
                                      }}
                                    >
                                      <i
                                        className="feather-user-minus"
                                        style={{ color: "white" }}
                                      />{" "}
                                      Unfollow
                                    </span>
                                  ) : (
                                    <span
                                      className="btn at-follw follow-button"
                                      onClick={
                                        isFollowButtonActive
                                          ? onFollow
                                          : () => {}
                                      }
                                    >
                                      <i className="feather-user-plus" /> Follow
                                    </span>
                                  )}

                                  <button
                                    type="button"
                                    className="btn at-follw share-button"
                                    onClick={shareModalHandler}
                                  >
                                    <i className="feather-share-2" />
                                  </button>
                                  <div
                                    className="btn at-follw share-button"
                                    onClick={handlerRefersh}
                                    // style={{ marginLeft: "15px" }}
                                  >
                                    <i className="feather-refresh-cw" />
                                  </div>

                                  <div
                                    className="count at-follw at-follw2"
                                    // style={{ background: "none" }}
                                  >
                                    <ShareDropdownProfile
                                      Userid={secondUserId}
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </div>

                        {/* <div className="col-md-12 col-xl-12 mt_lg--15 mt_md--15 mt_sm--15">
                    <div className="input-box" style={{ textAlign: "center" }}>
                      {getName.id === userId ? (
                        <button
                          type="submit"
                          path={"/edit-profile"}
                          style={{
                            borderRadius: "1rem",
                            height: " 36px",
                            width: "47px",
                            background: "rgb(189, 59, 177)",
                            color: "white",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ConnectToWallet
              show={walletmodal}
              handleModal={handleWalletModal}
            />
          </>
        )}
      </div>
    </>
  );
};

AuthorIntroArea.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1]),
  data: PropTypes.shape({
    name: PropTypes.string,
    twitter: PropTypes.string,
    followers: PropTypes.string,
    following: PropTypes.string,
    image: ImageType,
  }),
};
AuthorIntroArea.defaultProps = {
  space: 1,
};

const mapStateToProps = (state) => {
  return {
    getMyId: state.main.getCurrentUser,
    userImages: state.main.getCurrentStoreData,
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(AuthorIntroArea);
