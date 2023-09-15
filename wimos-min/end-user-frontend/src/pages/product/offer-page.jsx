import PropTypes from "prop-types";
import { useState } from "react";
import clsx from "clsx";
import Button from "@ui/button";
import Accordion from "@ui/accordion";
import Anchor from "@ui/anchor";
import AcceptBidModal from "@components/modals/accept-bid-modal";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { ApproveNFTBids } from "src/redux/actions/main";
import Web3 from "web3";
import { useMoralis } from "react-moralis";
import {
  CancelAuctionOffer,
  ApproveAuctionOffer,
  postWithdrawAuctionBid,
} from "src/redux/actions/main";
import Image from "next/image";
import bidIcon from "./bid-icon.png";
import bidBlack from "./bid-black.png";
import { useTheme } from "next-themes";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}
const OfferPage = ({ className, product, user, getContract }) => {
  console.log("porrr++++ ", product?.auctionOffers);
  // console.log("user++++ ", user);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const web03 = new Web3(Web3.givenProvider);
  const { isAuthenticated, authenticate } = useMoralis();
  const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(!show); // Toggle accordion
  };
  const [showAcceptBid, setShowAcceptBid] = useState(false);
  const handleAcceptBid = () => {
    setShowAcceptBid(!showAcceptBid);
  };
  const [btnsubmit, setBtnsubmit] = useState(false);

  // const handlerWithdraw = async (idd) => {
  //   console.log("23");
  // };

  const handlerWithdraw = async (idd) => {
    setBtnsubmit(idd);
    if (!isAuthenticated) {
      authenticate({
        signingMessage: "Wimos Authentication",
      });
    } else {
      try {
        const marketContract = new web03.eth.Contract(
          getContract.marketPlaceContract.abi,
          getContract.marketPlaceContract.contract_address
        );
        let marketResponse1 = await marketContract.methods
          .withdrawBids(product.auctionId)
          .send({
            from: user.metamaskId,
          });
        const Data = {
          id: product?.id,
          bidId: idd,
        };
        dispatch(postWithdrawAuctionBid(Data, setBtnsubmit, product?.id));
      } catch (err) {
        console.log("err", err);
        setBtnsubmit(false);
      }
    }
  };

  const handlerReject = async (idd) => {
    setBtnsubmit(idd);
    const Data = {
      id: idd,
    };
    dispatch(CancelAuctionOffer(Data));
    setBtnsubmit(false);
  };

  return (
    <div
      className={clsx(
        "rn-support-area",

        className
      )}
      // style={{ background: "white" }}
      style={{ padding: "10px 0" }}
    >
      <div className="row g-12">
        <div className="col-lg-12">
          <div className="support-accordion">
            <div className="custom-accordian">
              {/* <div className="custom-accordian-header" onClick={handleOpen}> */}
              {/* {!show ? (
                  <div className="custom-accordian-title">Offers</div>
                ) : (
                  <div className="custom-accordian-title-active">Offers</div>
                )} */}
              {/* <div className="sign">{show ? "-" : "+"}</div> */}
              {/* </div> */}
              {/* <h5>Bid</h5> */}
              <br />
              <span
                style={{
                  fontSize: "20px",
                  // paddingTop: "19px",
                  paddingLeft: "20px",
                  fontWeight: "bold",
                  // color: "#f4f4f4",
                  marginTop: "-2rem",
                  // position: "absolute",
                }}
                className="title"
              >
                {/* <Image
                  src="/images/icons/bid-icon.png"
                  alt="bid images"
                  layout="fixed"
                  width={28}
                  height={28}
                />{" "} */}
                {theme === "dark" ? (
                  <Image
                    src={bidIcon}
                    alt="bid images"
                    layout="fixed"
                    width={28}
                    height={28}
                    style={{ marginTop: "-5rem" }}
                  />
                ) : (
                  <Image
                    src={bidBlack}
                    alt="bid images"
                    layout="fixed"
                    width={28}
                    height={28}
                    style={{ marginTop: "-5rem" }}
                  />
                )}
                Bids
              </span>
              {/* {show && ( */}
              <br />
              <div
                className="custom-accordian-body"
                style={
                  product?.auctionOffers.length > 3
                    ? { overflowY: "scroll" }
                    : {}
                }
              >
                {product?.auctionOffers ? (
                  <>
                    {product?.auctionOffers &&
                    product?.auctionOffers.length > 0 ? (
                      <table
                        className="table table-hover"
                        style={{
                          borderCollapse: "separate",
                          borderSpacing: "29px 1em",
                          position: "relative",
                        }}
                      >
                        <>
                          <thead>
                            <tr>
                              <th>Profile</th>
                              <th>From</th>
                              {/* <th>Expiration</th> */}
                              <th>Price</th>
                              <th>Wallet ID</th>
                              <th></th>
                            </tr>
                          </thead>
                          <hr
                            style={{
                              width: "80%",
                              position: "absolute",
                              color: "#858585",
                            }}
                          />
                          <tbody>
                            {product?.auctionOffers.length > 0 &&
                              product?.auctionOffers?.map((nav) => (
                                <tr
                                  key={nav?._id}
                                  data-toggle="collapse"
                                  data-target="#accordion"
                                  className="clickable"
                                  style={{
                                    verticalAlign: "middle",
                                    // textAlign: "center",
                                  }}
                                >
                                  <td>
                                    <div
                                      className="catagory-collection"
                                      style={{ marginRight: "0px" }}
                                    >
                                      <div
                                        className="catagory"
                                        // style={{ width: "80%" }}
                                        style={{ marginRight: "0px" }}
                                      >
                                        <div className="top-seller-inner-one">
                                          <div
                                            className="thumbnail "
                                            style={
                                              {
                                                // height: "50px",
                                                // paddingLeft: " 10px",
                                              }
                                            }
                                          >
                                            {nav?.userData?.profile ? (
                                              <Image
                                                src={
                                                  process.env
                                                    .NEXT_PUBLIC_USER_AWS_URL +
                                                  "/user/" +
                                                  nav?.userData?.profile
                                                }
                                                alt={nav?.userData?.name}
                                                width="43"
                                                height="43"
                                                layout="fixed"
                                                style={{
                                                  borderRadius: "100%",
                                                }}
                                              />
                                            ) : (
                                              <Image
                                                src="/images/icons/boy-avater.png"
                                                alt={""}
                                                width="43"
                                                height="43"
                                                layout="fixed"
                                                style={{
                                                  borderRadius: "100%",
                                                }}
                                              />
                                            )}
                                          </div>{" "}
                                        </div>{" "}
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <Anchor
                                      path={`/user-profile/${nav?.userId}`}
                                      className="rn-collection-inner-one"
                                      // style={{ color: "#727076" }}
                                      style={{ color: "#858585" }}
                                    >
                                      <b>
                                        {/* {nav?.userId
                                          ? nav?.userId.slice(0, 6)
                                          : ""}
                                        ......{" "}
                                        {nav?.userId
                                          ? nav?.userId.slice(0 - 6)
                                          : ""} */}
                                        {nav?.userData?.name}
                                      </b>
                                    </Anchor>
                                  </td>
                                  <td style={{ color: "#858585" }}>
                                    {nav?.price} ETH
                                  </td>
                                  {/* <td>
                                {new Date(nav.endDate).toLocaleDateString()}
                              </td> */}
                                  <td style={{ color: "#858585" }}>
                                    {nav?.userData?.metamaskId?.slice(0, 8)}
                                  </td>

                                  {/*  */}
                                  {product.isAuctionCompletelyEnded ? (
                                    <>
                                      {nav?.userId &&
                                      nav?.userId?.includes(user?.id) ? (
                                        <td
                                          style={{
                                            float: "left",
                                            width: "141px",
                                          }}
                                        >
                                          <Button
                                            className="btn btn-info"
                                            onClick={() =>
                                              handlerWithdraw(nav?._id)
                                            }
                                            size={1}
                                          >
                                            {btnsubmit !== nav?._id ? (
                                              "Withdraw"
                                            ) : (
                                              <div
                                                className="create-load"
                                                style={{ paddingRight: "29px" }}
                                              >
                                                {" "}
                                              </div>
                                            )}
                                          </Button>
                                        </td>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}

                                  {/*  */}

                                  {/* {nav?.userId &&
                                  nav?.userId?.includes(user?.id) ? (
                                    <td
                                      style={{
                                        width: "180px",
                                        paddingRight: "30px",
                                      }}
                                    >
                                      {!product?.isAuctionEnded ? (
                                        <Button
                                          className="btn btn-info"
                                          onClick={() => handlerReject(nav._id)}
                                          size={1}
                                        >
                                          {btnsubmit !== nav._id ? (
                                            "Cancel biding"
                                          ) : (
                                            <div
                                              className="create-load"
                                              style={{ paddingRight: "29px" }}
                                            >
                                              {" "}
                                            </div>
                                          )}
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                  ) : (
                                    ""
                                  )} */}

                                  {/*  */}
                                </tr>
                              ))}
                            <tr>
                              <td colSpan="3">
                                <div id="accordion" className="collapse">
                                  Hidden by default
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      </table>
                    ) : (
                      <>
                        <br />
                        <p style={{ paddingLeft: "10px" }}>
                          Sorry...! you have no offers currently
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {product?.bidOffers && product?.bidOffers.length ? (
                      <table className="table table-hover">
                        <>
                          <thead>
                            <tr>
                              <th>Price</th>
                              <th>Expiration</th>
                              <th>From</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {product?.bidOffers?.map((nav) => (
                              <tr
                                key={nav._id}
                                data-toggle="collapse"
                                data-target="#accordion"
                                className="clickable"
                                style={{ verticalAlign: "middle" }}
                              >
                                <td>{nav.price}</td>
                                <td>
                                  {new Date(nav.endDate).toLocaleDateString()}
                                </td>
                                <td>
                                  <Anchor
                                    path={`/user-profile/${nav.userId}`}
                                    className="rn-collection-inner-one"
                                    style={{ color: "#727076" }}
                                  >
                                    <b>{nav?.userData?.name}</b>
                                  </Anchor>
                                </td>
                                {product?.userId &&
                                product.userId.includes(user.id) ? (
                                  <td style={{ float: "left" }}>
                                    <Button
                                      className="btn btn-info"
                                      onClick={() => handlerWithdraw(nav._id)}
                                    >
                                      {btnsubmit !== nav._id ? (
                                        "Accept"
                                      ) : (
                                        <div className="create-load"> </div>
                                      )}
                                    </Button>
                                  </td>
                                ) : (
                                  ""
                                )}

                                {/* <td>
                              <Button
                                className="btn btn-info"
                                onClick={handlers}
                              >
                                Reject
                              </Button>
                            </td> */}
                              </tr>
                            ))}
                            <tr>
                              <td colSpan="3">
                                <div id="accordion" className="collapse">
                                  Hidden by default
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      </table>
                    ) : (
                      <>
                        <br />
                        <p style={{ paddingLeft: "10px" }}>
                          Sorry...! you have no offers currently
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
              {/* )} */}
            </div>
          </div>
          {/* <Accordion
                defaultActiveKey={0}
                items={[
                  {
                    id: 0,
                    title: "Offers",
                    description: ` <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Price</th>
                            <th>Expiration</th>
                            <th>From</th>
                      
                          </tr>
                        </thead> 
                        <tbody onClick={handler}>
                          <tr
                            data-toggle="collapse"
                            data-target="#accordion"
                            class="clickable"
                          >
                            <td>Some Stuff</td>
                            <td>Some more stuff</td>
                            <td>And some more</td>
                            <td><a href="" type="button" class="btn btn-info">Accept</a></td>
                            <td><a href="http://www.url.com/" type="button" class="btn btn-danger">Reject</a></td>
                            <td> <Button class="btn btn-info" onClick='{"{handler}"}' path="">Tijo</Button></td>
                          </tr>
                          <tr>
                            <td colspan="3">
                              <div id="accordion" class="collapse">
                                Hidden by default
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>`,
                  },
                ]}
                // handler={handler}
              /> */}
          {/* <Accordion title="Click Me123!" content="this is content 1" /> */}

          <div></div>
        </div>
      </div>
      {showAcceptBid && (
        <AcceptBidModal
          handleModal={handleAcceptBid}
          show={showAcceptBid}
          // first={first}
          // second={second}
        />
      )}
    </div>
  );
};

OfferPage.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1, 2]),
};
OfferPage.defaultProps = {
  space: 1,
};
// export async function getStaticPaths() {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// }
const mapStateToProps = (state) => {
  return {
    user: state.main.getCurrentUser,
    getContract: state.main.getContract,
  };
};
export default connect(mapStateToProps)(OfferPage);
