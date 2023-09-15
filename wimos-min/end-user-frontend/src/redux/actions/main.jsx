import * as t from "../types";
import Link from "next/link";
import Router from "next/router";

import {
  login,
  logoutAction,
  CreateCollection,
  getContractData,
  getCollectionDatas,
  UpdateProfileData,
  UpdateProfileDataImage,
  createNftPost,
  getMyNft,
  getAllStoreNftsData,
  getCurrentUserData,
  getCurrentStoreData,
  getTopCollectionsData,
  getTopNftsData,
  getMyCollectionsData,
  SellNFT,
  getMyCollectionsNFTData,
  BuyNFT,
  getUpdateNft,
  getNFT,
  getUserNFTData,
  makeBidData,
  deleteNft,
  getAuctionData,
  ViewNFTBidsData,
  ApproveNFTBidsData,
  ViewUser,
  CancelNFT,
  getSeoData,
  getDashboardData,
  getHistoryData,
  searchData,
  getFee,
  updateFee,
  placeaBid,
  CancelBid,
  AddAuctionOfferData,
  ApproveAuctionOfferData,
  CancelAuctionOfferData,
  getHomeExploreNftsData,
  getBlogs,
  UpdateCollection,
  deleteCollection,
  getPages,
  getNotifications,
  updateNotification,
  postNotification,
  postNotificationSettingsData,
  report,
  getSearchHistoryData,
  postSearchHistoryData,
  deleteSearchHistoryData,
  postLikeData,
  postUnLikeData,
  postFollowData,
  postUnFollowData,
  postUserData,
  getWishlistData,
  postWishlistData,
  deleteWishlistData,
  clearallWishlistData,
  hideCollectionsData,
  getCollectionByIdData,
  getBlogCategoryData,
  getSocialMediaData,
  postWithdrawAuctionBidData,
  postEndAuctionData,
  deleteListingFeeData,
  editListingFeeData,
  addListingFeeData,
  postTransferData,
  postMakeanOfferData,
  postAcceptOfferData,
  putCancelOfferData,
} from "../services/main";
import productData from "../../data/products.json";
import homepageData from "../../data/homepages/home-01.json";
import collectionsData from "../../data/collections.json";
import contractdata from "../../data/contract.json";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import { useRouter } from "next/router";
import { socket } from "@utils/socket";
import { useSelector } from "react-redux";

export const LOGIN_CONFIRMED_ACTION = "LOGIN_CONFIRMED_ACTION";

const isFunction = (obj) => {
  return (
    typeof obj === "function" &&
    typeof obj.nodeType !== "number" &&
    typeof obj.item !== "function"
  );
};

export const getProducts = () => (dispatch) => {
  dispatch({
    type: t.GET_PRODUCT_DATA,
    payload: productData,
  });
};

export const getHomeData = () => (dispatch) => {
  dispatch({
    type: t.GET_HOME_DATA,
    payload: homepageData,
  });
};

export const updateLoader = (value) => (dispatch) => {
  dispatch({
    type: t.LOADER,
    payload: value,
  });
};

// export const getCollectionData = () => (dispatch) => {
//   dispatch({
//     type: t.GET_COLLECTION_DATA,
//     payload: collectionsData,
//   });
// };

export const loginData = (Data) => (dispatch) => {
  // console.log("tijoooooooo", metamaskId);
  login(Data)
    .then((response) => {
      //console.log("loginresponse", response.data);
      // const notify = () => toast("Login Successfully");
      // notify();

      localStorage.setItem("e_wimos", response?.data?.token);

      dispatch({
        type: t.POST_LOGIN_DATA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("err", error.response);
      // const notify = () => toast.error("Login Error");
      // notify();
    });
};

export const logoutData = () => (dispatch) => {
  // console.log("1234");
  localStorage.removeItem("e_wimos");
  dispatch({
    type: t.LOGOUT_ACTION,
    payload: "",
  });
  // logoutAction()
  //   .then((response) => {
  //     dispatch({
  //       type: t.LOGOUT_ACTION,
  //       payload: "",
  //     });
  //   })
  //   .catch((error) => {
  //     // const notify = () => toast.error("Logout Error");
  //     // notify();
  //     console.log("err", error.response);
  //   });
};

export const UpdateProfile = (Data, router, setIsLoading) => (dispatch) => {
  //console.log("Data", Data);
  setIsLoading(true);

  UpdateProfileData(Data)
    .then((response) => {
      dispatch({
        type: t.UPDATE_PROFILE,
        payload: response.data.data,
      });

      setIsLoading(false);

      const notify = () => toast("Profile updated successfully");
      notify();
      setTimeout(() => {
        router.push("/author");
      }, 1000);
    })
    .catch((error) => {
      setIsLoading(false);

      // console.log("Update profile", error.response.data.errors[0].message);
      let errorss = error.response.data.errors;
      let msgs = errorss?.map((e) => {
        return e.message + "\n";
      });
      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const UpdateProfileImage =
  (Data, router, setIsLoading) => (dispatch) => {
    //console.log("Data", Data);
    setIsLoading(true);

    UpdateProfileDataImage(Data)
      .then((response) => {
        dispatch({
          type: t.UPDATE_PROFILE,
          payload: response.data.data,
        });
        dispatch(getCurrentUser());
        setIsLoading(false);
        //console.log("123456789", response.data.data);
        const notify = () => toast("Profile updated successfully");
        notify();

        setTimeout(() => {
          if (response.data.data.name !== "") {
            router.push("/author");
          }
        }, 1000);
      })
      .catch((error) => {
        // console.log("eeee", error);

        setIsLoading(false);

        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while uploading!!");
        }
      });
  };

export const createCollectionAction =
  (
    data,
    reset,
    setSelectedImage,
    setSelectedImageBanner,
    setBtnsubmit,
    router
  ) =>
  (dispatch) => {
    // console.log("tijoooooooo", data);
    CreateCollection(data)
      .then((response) => {
        dispatch({
          type: t.POST_CREATE_COLLECTION_DATA,
          payload: response.data,
        });
        dispatch(getCollection());
        const notify = () => toast("Collection created successfully");
        notify();
        reset();
        setSelectedImage();
        setSelectedImageBanner();
        setBtnsubmit(false);

        router.push(`/collections/${response.data.data.id}`);
      })
      .catch((error) => {
        // console.log("errrcreateCollection", error.response);
        let errorss = error?.response?.data;
        // console.log("errorss", errorss);
        let msgs = Array.isArray(errorss)
          ? errorss?.map((e) => {
              return e.message + "\n";
            })
          : ["Something went wrong"];
        //console.log("msgs", msgs);

        const notify = () => toast.error(msgs?.join(","));
        notify();
        setBtnsubmit(false);
      });
  };

export const getContract = () => (dispatch) => {
  // console.log("1234");
  // dispatch({
  //   type: t.GET_CONTRACT_DATA,
  //   payload: contractdata,
  // });
  getContractData()
    .then((response) => {
      // console.log("getContractData", response);

      dispatch({
        type: t.GET_CONTRACT_DATA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrgetContractData", error.response);
    });
};

export const getHistory = (data) => (dispatch) => {
  getHistoryData(data)
    .then((response) => {
      // console.log("getHistory", response.data.data);
      dispatch({
        type: t.GET_HISTORY,
        payload: response.data.data.history,
      });
    })
    .catch((error) => {
      // console.log("errrallstorenft", error.response);
    });
};

export const getCollection = () => (dispatch) => {
  // console.log("rehed");
  getCollectionDatas()
    .then((response) => {
      // console.log("getCollection", response);

      dispatch({
        type: t.GET_COLLECTION_DATA,
        payload: response.data.data,
      });
      dispatch(updateLoader(false));
    })

    .catch((error) => {
      // console.log("errcollection", error.response);
    });
};

export const createNft =
  (Data, router, handleShowmodal, handleNftView) => (dispatch) => {
    //console.log("spiderman", Data);
    createNftPost(Data)
      .then((response) => {
        // console.log("createNft", response);
        dispatch({
          type: t.POST_NFT,
          payload: response.data,
        });
        // handleShowmodal();
        // handleNftView();
        const notify = () => toast("Your NFT created successfully");
        notify();
        dispatch(getHomeData());
        dispatch(getTopCollections());
        dispatch(getTopNfts());
        dispatch(getAuctionNft());
        dispatch(getHomeExploreNfts());
        dispatch(getCurrentStore());
        dispatch(getCollection());
        // setInputFields([{ character: "", male: "" }]);
        // dispatch(getAllStoreNfts());
        // router.push(`/product/${response.data.data.id}`);
      })
      .catch((error) => {
        console.log("errorNFTTT", error.response);
        let errorss = error?.response?.data;
        let msgs = Array.isArray(errorss)
          ? errorss?.map((e) => {
              return e.message + "\n";
            })
          : ["Something went wrong"];
        const notify = () => toast.error(msgs?.join(","));
        notify();
        // handleNftView();
      });
  };

export const getmyNft = () => (dispatch) => {
  getMyNft()
    .then((response) => {
      //console.log("mynft", response);
      dispatch({
        type: t.GET_MY_NFT,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrallstorenft", error.response);
    });
};

export const getAllStoreNfts = (params, isPaginating) => async (dispatch) => {
  try {
    const response = await getAllStoreNftsData({
      collection: params?.collection,
      category: params?.category,
      sale_type: params?.sale_type,
      price: params?.price,
      page: params?.page,
    });

    // const allNfts = useSelector((state) => state.main.getAllStoreNfts);

    if (isPaginating) {
      dispatch({
        type: t.GET_ALL_STORE_NFTS,
        payload: response.data.data,
        isPaginating,
      });
    } else {
      dispatch({
        type: t.GET_ALL_STORE_NFTS,
        payload: response.data.data,
      });
    }

    dispatch(updateLoader(false));
  } catch (error) {
    console.log("catch -- error", error);
  }

  return "done";

  // await getAllStoreNftsData({
  //   collection: params?.collection,
  //   category: params?.category,
  //   sale_type: params?.sale_type,
  //   price: params?.price,
  //   page: params?.page,
  //   setIsLoading: params?.setIsLoading
  // })
  //   .then((response) => {
  //     //console.log("getallstorenfts", response.data);

  //     dispatch({
  //       type: t.GET_ALL_STORE_NFTS,
  //       payload: response.data.data,
  //     });
  //     dispatch(updateLoader(false));

  //     setIsLoading(false)

  //   })
  //   .catch((error) => {
  //     // console.log(error?.response?.data?.errors[0].message);
  //   });
};

export const getCurrentUser = () => (dispatch) => {
  // const router = useRouter();
  // console.log("rehed");
  getCurrentUserData()
    .then((response) => {
      // console.log("getCurrentUser123", response.data);

      dispatch({
        type: t.GET_CURRENT_USER,
        payload: response.data.data,
      });

      if (response.data.data.name == "") {
        Router.push("/edit-profile");
      }
    })
    .catch((error) => {
      // console.log("errrallstorenft", error.response);
    });
};

export const getCurrentStore = () => (dispatch) => {
  // console.log("rehed");
  getCurrentStoreData()
    .then((response) => {
      // console.log("getCurre==ntStore", response.data);

      dispatch({
        type: t.GET_CURRENT_STORE_DATA,
        payload: response.data.data,
      });
      dispatch(updateLoader(false));
    })
    .catch((error) => {
      console.log("errrallstorenft", error.response);
      if (error?.response?.data?.errors[0]?.message === "Store not found") {
        Router.push("/404");
      }
    });
};

export const getTopCollections = () => (dispatch) => {
  // console.log("rehed");
  getTopCollectionsData()
    .then((response) => {
      // console.log("getTopCollections", response.data);

      dispatch({
        type: t.GET_TOP_COLLECTIONS_DATA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrTopCollections", error.response);
    });
};

export const getTopNfts = () => (dispatch) => {
  // console.log("rehed");
  getTopNftsData()
    .then((response) => {
      // console.log("TopNfts", response.data);

      dispatch({
        type: t.GET_TOP_NFTS_DATA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrTopNfts", error.response.data);
    });
};

export const getMyCollections = () => (dispatch) => {
  // console.log("rehed");
  getMyCollectionsData()
    .then((response) => {
      // console.log("TopNfts", response.data);

      dispatch({
        type: t.GET_MY_COLLECTIONS_DATA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrTopNfts", error.response.data);
    });
};

export const sellNft = (Data, setShowSellModel) => (dispatch) => {
  SellNFT(Data)
    .then((response) => {
      // console.log("re", response);
      dispatch({
        type: t.SELL_NFT,
        payload: response.data,
      });
      const notify = () => toast("Your NFT Listed successfully");
      notify();

      if (isFunction(setShowSellModel)) {
        setShowSellModel(false);
      }

      // dispatch(getAllStoreNfts());
      // dispatch(getmyNft());

      // manually updating values of this nft in redux store (getAllStoreNft)
      dispatch({
        type: t.BUY_SELL_MANUALLY_UPDATE_IN_GETALLSTORENFT,
        payload: {
          id: Data?.id,
          status: true,
          price: Data?.price,
          startingPrice: Data?.startingPrice,
        },
      });

      // manually updating in get nft
      dispatch({
        type: t.BUY_SELL_MANUALLY_UPDATE_IN_GET_NFT,
        payload: {
          id: Data?.id,
          status: true,
          price: Data?.price,
          startingPrice: Data?.startingPrice,
        },
      });

      // calling getNft for detail page
      dispatch(getNFTData(Data?.id));

      // window.location.reload();
    })
    .catch((error) => {
      console.log("error", error);
      const errornotify = () =>
        toast.error("An error occured! Please try again later");
      errornotify();

      if (isFunction(setShowSellModel)) {
        setShowSellModel(false);
      }
    });
};

export const getMyCollectionsNFT = (data) => (dispatch) => {
  // console.log("123456", data);
  getMyCollectionsNFTData(data)
    .then((response) => {
      // console.log("collectionNFT", response.data);

      dispatch({
        type: t.GET_MY_COLLECTIONS_NFT,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrCollNfts", error.response);
    });
};

export const buyNft = (Data, id, setShowBuy) => (dispatch) => {
  console.log("Data off buuuu", Data);
  BuyNFT(Data)
    .then((response) => {
      // console.log("re", response);
      // window.location.reload();
      dispatch({
        type: t.BUY_NFT,
        payload: response.data,
      });
      dispatch(getNFTData(id));

      if (isFunction(setShowBuy)) {
        setShowBuy(false);
      }

      const notify = () => toast("The NFT has been purchased successfully");
      notify();
      // dispatch(getAllStoreNfts());
      // dispatch(getmyNft());

      // manually updating data of this nft in redux store
      dispatch({
        type: t.BUY_SELL_MANUALLY_UPDATE_IN_GETALLSTORENFT,
        payload: {
          id: Data?.id,
          status: false,
          price: 0,
          startingPrice: 0,
        },
      });

      // update in get nft
      dispatch({
        type: t.BUY_SELL_MANUALLY_UPDATE_IN_GET_NFT,
        payload: {
          id: Data?.id,
          status: false,
          price: 0,
          startingPrice: 0,
        },
      });

      socket.emit("buy", {
        notificationData: response?.data?.notificationData,
      });
    })
    .catch((error) => {
      const errornotify = () => toast.error("An error occured!");
      errornotify();
      if (isFunction(setShowBuy)) {
        setShowBuy(false);
      }

      // console.log("error", error.response);
    });
};

export const placeBid = (Data) => (dispatch) => {
  placeaBid(Data)
    .then((response) => {
      // console.log("re", response);
      // window.location.reload();
      dispatch({
        type: t.PLACE_BID,
        payload: response.data,
      });
      const notify = () => toast("The bid has been submited successfully");
      notify();
      dispatch(getAllStoreNfts());
      dispatch(getmyNft());
    })
    .catch((error) => {
      const errornotify = () => toast.error("An error occured!");
      errornotify();
      // console.log("error", error.response);
    });
};
export const UpdateNft = (Data, router) => (dispatch) => {
  // console.log("Data", Data);
  getUpdateNft(Data)
    .then((response) => {
      dispatch({
        type: t.UPDATE_NFT,
        payload: response.data.data,
      });
      router.push(`/product/${response.data.data.id}`);
    })
    .catch((error) => {
      // console.log("errorupdatenft", error);
      // const notify = () => toast.error("Error while update NFT");
      // notify();
    });
};

export const getNFTData = (data) => (dispatch) => {
  // console.log("123456", data);
  getNFT(data)
    .then((response) => {
      //console.log("getNFTData", response.data);
      dispatch({
        type: t.GET_NFT,
        payload: response.data.data,
      });
      dispatch(updateLoader(false));
    })
    .catch((error) => {
      // console.log("errrCollNfts", error.response);
    });
};

export const getUserNFT = (data, setLoaderData) => (dispatch) => {
  // console.log("bla", data);
  getUserNFTData(data)
    .then((response) => {
      // console.log("collectionNFT", response.data);

      dispatch({
        type: t.GET_USER_NFT,
        payload: response.data.data,
      });
      if (isFunction(setLoaderData)) {
        setLoaderData(false);
      }
    })
    .catch((error) => {
      if (isFunction(setLoaderData)) {
        setLoaderData(false);
      }

      // console.log("errrCollNfts", error.response);
    });
};

export const makeBid = (Data) => (dispatch) => {
  //console.log("Data", Data);
  makeBidData(Data)
    .then((response) => {
      //console.log("makeBid", response.data);
      //window.location.reload();
      dispatch({
        type: t.MAKE_BID,
        payload: response.data.data,
      });
      const notify = () => toast("The Bid send successfully");
      notify();
    })
    .catch((error) => {
      // console.log("errrmakeBid", error.response);
      const errornotify = () =>
        toast.error("An error occured! Please try again later");
      errornotify();
    });
};

export const DeleteNft = (Data, router) => (dispatch) => {
  // console.log("Data", Data);
  deleteNft(Data)
    .then((response) => {
      dispatch({
        type: t.DELETE_NFT,
        payload: response.data,
      });
      const notify = () => toast("Your NFT deleted successfully");
      notify();
      // window.location.reload();
      router.push("/explore");
    })
    .catch((error) => {
      // console.log("errrDeleteNft", error.response);
      const errornotify = () =>
        toast.error("An error occured! Please try again later");
      errornotify();
    });
};

export const getAuctionNft = () => (dispatch) => {
  // console.log("123456", data);
  getAuctionData()
    .then((response) => {
      // console.log("collectionNFT", response.data);

      dispatch({
        type: t.GET_AUCTION_NFT,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrCollNfts", error.response);
    });
};

export const ViewNFTBids = (data) => (dispatch) => {
  // console.log("bla", data);
  ViewNFTBidsData(data)
    .then((response) => {
      //  console.log("ViewNFTBids", response.data);

      dispatch({
        type: t.VIEW_NFT_BIDS,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrCollNfts", error.response);
    });
};

export const ApproveNFTBids = (data) => (dispatch) => {
  // console.log("bla", data);
  ApproveNFTBidsData(data)
    .then((response) => {
      // console.log("ApproveNFTBids", response.data);
      dispatch({
        type: t.APPROVE_NFT_BIDS,
        payload: response.data.data,
      });
      const notify = () => toast("Accepted successfully");
      notify();
      dispatch(getAllStoreNfts());
      dispatch(getmyNft());
    })
    .catch((error) => {
      // console.log("ApproveNFTBids", error.response);
    });
};

export const ViewUserData = (data) => (dispatch) => {
  // console.log("bla", data);
  ViewUser(data)
    .then((response) => {
      // console.log("ViewUser", response.data);

      dispatch({
        type: t.VIEW_USER_DATA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrViewUser", error.response);
    });
};

export const CancelNFTData = (data, id) => (dispatch) => {
  // console.log("bla", data);
  CancelNFT(data)
    .then((response) => {
      // console.log("CancelNFTData", response.data);
      const notify = () => toast("Cancel listing  Successfully");
      notify();

      dispatch({
        type: t.CANCEL_NFT_DATA,
        payload: response.data.data,
      });
      dispatch(getNFTData(id));
      dispatch(getAllStoreNfts());
      dispatch(getmyNft());
    })
    .catch((error) => {
      // console.log("errrViewUser", error.response);
    });
};

export const CancelBidData = (data) => (dispatch) => {
  // console.log("bla", data);
  CancelBid(data)
    .then((response) => {
      // console.log("CancelNFTData", response.data);
      const notify = () => toast("Cancel your bid Successfully");
      notify();

      dispatch({
        type: t.CANCEL_BID_DATA,
        payload: response.data.data,
      });
      dispatch(getAllStoreNfts());
      dispatch(getmyNft());
    })
    .catch((error) => {
      // console.log("errrViewUser", error.response);
    });
};

export const getDashboard = () => (dispatch) => {
  // const router = useRouter();
  // console.log("rehed");
  getDashboardData()
    .then((response) => {
      // console.log("getDashboard", response.data);

      dispatch({
        type: t.GET_DASHBOARD,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errrgetDashboard", error.response);
    });
};

export const getSearch = (data, setBtnsubmit) => (dispatch) => {
  // const router = useRouter();
  // console.log("rehed");
  searchData(data)
    .then((response) => {
      // console.log("getSearch", response.data);

      dispatch({
        type: t.GET_SEARCH,
        payload: response.data.data,
      });
      setBtnsubmit(false);
    })
    .catch((error) => {
      // console.log("errrgetDashboard", error.response);
    });
};

export const updateFeeData = (Data, setIsLoading) => (dispatch) => {
  updateFee(Data)
    .then((response) => {
      // console.log("updateFeeData", response);
      setIsLoading(false);
      dispatch({
        type: t.UPDATE_FEE,
        payload: response.data.data,
      });
      const notify = () => toast("Your listing fee created successfully");
      notify();
    })
    .catch((error) => {
      // setIsLoading(false);
      console.log("err pdateFeeData", error.response.data);

      // console.log("Update profile", error.response.data.errors[0].message);
      // let errorss = error.response.data;
      // let msgs = errorss?.map((e) => {
      //   return e.message + "\n";
      // });
      const notify = () => toast.error(error.response.data.message);
      notify();
      setIsLoading(false);
    });
};

export const getFeeData = () => (dispatch) => {
  getFee()
    .then((response) => {
      // console.log("getFeeData", response);

      dispatch({
        type: t.GET_FEE,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errr getFeeData", error.response);
    });
};

export const AddAuctionOffer = (Data, id) => (dispatch) => {
  AddAuctionOfferData(Data)
    .then((response) => {
      // console.log("AddAuctionOffer", response);

      dispatch({
        type: t.ADD_AUCTION_OFFER,
        payload: response.data.data,
      });
      dispatch(getNFTData(id));
      const notify = () => toast("Your bid placed successfully");
      notify();
      // setShowBid(false);
      // setFirst(0);
      dispatch(getNFTData(Data.id));
    })
    .catch((error) => {
      // console.log("errr AddAuctionOffer", error.response);
      let errorss = error.response?.data?.errors;
      let msgs = errorss?.map((e) => {
        return e.message + "\n";
      });
      // setShowBid(false);
      // setFirst(0);
      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const CancelAuctionOffer = (Data) => (dispatch) => {
  CancelAuctionOfferData(Data)
    .then((response) => {
      // console.log("AddAuctionOffer", response);

      dispatch({
        type: t.CANCEL_AUCTION_OFFER,
        payload: response.data.data,
      });
      const notify = () => toast("Your auction canceled successfully");
      notify();
    })
    .catch((error) => {
      // console.log("errr AddAuctionOffer", error.response);
      let errorss = error.response?.data?.errors;
      let msgs = errorss?.map((e) => {
        return e.message + "\n";
      });
      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const ApproveAuctionOffer = (Data) => (dispatch) => {
  ApproveAuctionOfferData(Data)
    .then((response) => {
      // console.log("AddAuctionOffer", response);

      dispatch({
        type: t.APPROVE_AUCTION_OFFER,
        payload: response.data.data,
      });
      const notify = () => toast("Your auction approved successfully");
      notify();
    })
    .catch((error) => {
      // console.log("errr AddAuctionOffer", error.response);
    });
};

export const getHomeExploreNfts = () => async (dispatch) => {
  getHomeExploreNftsData()
    .then((response) => {
      dispatch({
        type: t.GET_HOME_EXPLORE_NFTS,
        payload: response.data.data,
      });
      dispatch(updateLoader(false));
    })
    .catch((error) => {
      // console.log(error);
    });
};

export const getBlogsData = (router) => (dispatch) => {
  getBlogs()
    .then((response) => {
      // console.log("getFeeData", response);

      dispatch({
        type: t.GET_BLOGS,
        payload: response.data.data,
      });

      router.push("/blogs");
      dispatch(updateLoader(false));
    })
    .catch((error) => {
      // console.log("errr getFeeData", error.response);
    });
};

export const updateCollectionAction =
  (
    id,
    data,
    reset,
    setSelectedImage,
    setSelectedImageBanner,
    setBtnsubmit,
    router
  ) =>
  (dispatch) => {
    // console.log("tijoooooooo", id);
    UpdateCollection(data, id)
      .then((response) => {
        dispatch({
          type: t.UPDATE_COLLECTION,
          payload: response.data,
        });

        const notify = () => toast("Collection updated successfully");

        notify();

        reset();
        setSelectedImage();
        setSelectedImageBanner();
        setBtnsubmit(false);
        dispatch(getCollection());
        router.push("/collection");
      })
      .catch((error) => {
        // console.log("errrcreateCollection", error.response);
        let errorss = error?.response?.data;
        // console.log("errorss", errorss);
        let msgs = errorss?.map((e) => {
          return e.message + "\n";
        });
        //console.log("msgs", msgs);

        const notify = () => toast.error(msgs?.join(","));
        notify();
        setBtnsubmit(false);
      });
  };

export const DeleteCollections = (id, router, handleModal) => (dispatch) => {
  // console.log("iddd", id);
  deleteCollection(id)
    .then((response) => {
      dispatch({
        type: t.DELETE_COLLECTION,
        payload: response.data,
      });
      const notify = () => toast("Your collection deleted successfully");
      notify();
      // window.location.reload();
      dispatch(getCollection());
      router.push("/collection");
    })
    .catch((error) => {
      // console.log("errrDeleteNft", error.response);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);

      const notify = () => toast.error(msgs?.join(","));
      notify();
      handleModal();
      // const errornotify = () =>
      //   toast.error("An error occured! Please try again later");
      // errornotify();
    });
};

export const getPagesData = () => (dispatch) => {
  getPages()
    .then((response) => {
      // console.log("getFeeData", response);

      dispatch({
        type: t.GET_PAGES,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errr getFeeData", error.response);
    });
};

export const getNotificationsData = () => (dispatch) => {
  getNotifications()
    .then((response) => {
      // console.log("getFeeData", response);

      dispatch({
        type: t.GET_NOTIFICATIONS,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errr getFeeData", error.response);
    });
};

export const updateNotificationsData = (Data) => (dispatch) => {
  // console.log("22");
  updateNotification(Data)
    .then((response) => {
      //console.log("updateNotificationsData", response);

      dispatch({
        type: t.UPDATE_NOTIFICATION,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      console.log("errr updateNotificationsData", error.response);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);

      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const postNotificationsData = (Data, setBtnsubmit) => (dispatch) => {
  // console.log("22");
  postNotification(Data)
    .then((response) => {
      // console.log("post++++", response);

      dispatch({
        type: t.POST_NOTIFICATION,
        payload: response.data.data,
      });
      const notify = () => toast("Settings changed successfully");
      notify();
      setBtnsubmit(false);
    })
    .catch((error) => {
      // console.log("errr postNotificationsData", error.response);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();
      // setBtnsubmit(false);
    });
};

export const getNotificationsSettings = () => (dispatch) => {
  // console.log("22");
  postNotificationSettingsData()
    .then((response) => {
      dispatch({
        type: t.GET_NOTIFICATION_SETTINGS,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errr postNotificationsData", error.response);
      // setBtnsubmit(false);
    });
};

export const reportData = (Data) => (dispatch) => {
  report(Data)
    .then((response) => {
      dispatch({
        type: t.REPORT,
        payload: response.data,
      });
      const notify = () => toast("Report message send successfully");
      notify();
    })
    .catch((error) => {
      let errorss = error?.response?.data?.errors;
      //console.log("errorss", error.response.data.errors);
      let msgs = errorss?.map((e) => {
        return e.message + "\n";
      });
      //console.log("msgs", msgs);

      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const getSeachHistory = () => (dispatch) => {
  getSearchHistoryData()
    .then((response) => {
      // console.log("getSeachHistory++++", response);

      dispatch({
        type: t.GET_SEARCH_HISTORY,
        payload: response.data,
      });
    })
    .catch((error) => {});
};

export const postSeachHistory = (Data, setKeyAvtive) => (dispatch) => {
  postSearchHistoryData(Data)
    .then((response) => {
      // console.log("postSeachHistory++++", response);

      dispatch({
        type: t.POST_SEARCH_HISTORY,
        payload: response.data,
      });
      setKeyAvtive(false);
    })
    .catch((error) => {});
};

export const deleteSearchHistory = () => (dispatch) => {
  deleteSearchHistoryData()
    .then((response) => {
      // console.log("deleteSearchHistory++++", response);

      dispatch({
        type: t.DELETE_SEARCH_HISTORY,
        payload: response.data,
      });
      dispatch(getSeachHistory());
    })
    .catch((error) => {});
};

export const postLike = (Data, id, isDetailPage) => (dispatch) => {
  // console.log("daa Data idddddd", id);
  // console.log("daa Data", Data);

  if (!isDetailPage) {
    // manually update in getAllStoreNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETALLSTORENFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
    // manually update in getTopNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETTOPNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
    // manually update in getAuctionNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETAUCTIONNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
    // manually update in getHomeExploreNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETHOMEEXPLORENFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
    // manually update in getUserNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_getUserNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
    // manually update in getCollectionsNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GetCollectionsNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
    // manually update in getMyNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETMYNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
  }

  if (isDetailPage === true) {
    // manually update in getNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
  }

  postLikeData(Data)
    .then((response) => {
      // console.log("postLike++++", response);
      // dispatch(getNFTData(id));
      // dispatch(getAllStoreNfts());

      dispatch({
        type: t.POST_LIKE,
        payload: response.data,
      });

      console.log(
        "sending like notification -- ",
        response?.data?.notificationData
      );

      // send like notification to other user
      socket.emit("like", {
        notificationData: response?.data?.notificationData,
      });
    })
    .catch((error) => {
      console.log("postLike++++ err", error);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();

      if (!isDetailPage) {
        // manually update in getAllStoreNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETALLSTORENFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
        // manually update in getTopNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETTOPNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
        // manually update in getAuctionNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETAUCTIONNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
        // manually update in getHomeExploreNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETHOMEEXPLORENFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
        // manually update in getUserNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_getUserNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
        // manually update in getCollectionsNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GetCollectionsNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
        // manually update in getMyNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETMYNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
      }

      if (isDetailPage === true) {
        // manually update in getNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
      }
    });
};

export const postUnLike = (Data, id, isDetailPage) => (dispatch) => {
  if (!isDetailPage) {
    // manually update in getAllStoreNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETALLSTORENFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
    // manually update in getTopNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETTOPNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
    // manually update in getAuctionNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETAUCTIONNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
    // manually update in getHomeExploreNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETHOMEEXPLORENFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
    // manually update in getUserNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_getUserNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
    // manually update in getMyNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETMYNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
    // manually update in getCollectionsNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GetCollectionsNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
  }

  if (isDetailPage === true) {
    // manually update in getNft
    dispatch({
      type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
  }

  // console.log("daa postUnLike", id);
  postUnLikeData(Data)
    .then((response) => {
      // console.log("postUnLike++++", response);
      // dispatch(getNFTData(id));
      // dispatch(getAllStoreNfts());

      dispatch({
        type: t.POST_UNLIKE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("postUnLike++++ err", error);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();

      if (!isDetailPage) {
        // manually update in getAllStoreNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETALLSTORENFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getTopNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETTOPNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getAuctionNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETAUCTIONNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getHomeExploreNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETHOMEEXPLORENFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getUserNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_getUserNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getMyNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETMYNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getMyNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETMYNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
        // manually update in getCollectionsNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GetCollectionsNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
      }

      if (isDetailPage === true) {
        // manually update in getNft
        dispatch({
          type: t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
      }
    });
};

export const postFollow = (Data, id, isDetailPage) => (dispatch) => {
  // console.log("Data ++++++++", Data);
  if (isDetailPage === true) {
    // manually update in getUser
    dispatch({
      type: t.FOLLOW_UNFOLLOW_MANUALLY_UPDATE_IN_GETUSERINFO,
      payload: {
        id: Data?.userId,
        status: true,
      },
    });
  }
  postFollowData(Data)
    .then((response) => {
      // console.log("postFollow++++", response);
      // dispatch(getUserInfo(id));
      // const notify = () => toast("Follow Added Successfully");
      // notify();
      dispatch({
        type: t.POST_FOLLOW,
        payload: response.data,
      });

      console.log(
        "sending follow notification -- ",
        response?.data?.data?.notificationData
      );

      // send like notification to other user
      socket.emit("follow", {
        notificationData: response?.data?.data?.notificationData,
      });
    })
    .catch((error) => {
      console.log("postFollow++++ err", error);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      // const notify = () => toast.error(msgs?.join(","));
      // notify();
      console.error(error);
      if (isDetailPage === true) {
        // manually update in getUser
        dispatch({
          type: t.FOLLOW_UNFOLLOW_MANUALLY_UPDATE_IN_GETUSERINFO,
          payload: {
            _id: Data?.userId,
            status: false,
          },
        });
      }
    });
};

export const postUnFollow = (Data, id, isDetailPage) => (dispatch) => {
  if (isDetailPage === true) {
    // manually update in getUser
    dispatch({
      type: t.FOLLOW_UNFOLLOW_MANUALLY_UPDATE_IN_GETUSERINFO,
      payload: {
        id: Data?.userId,
        status: false,
      },
    });
  }
  postUnFollowData(Data)
    .then((response) => {
      // console.log("postFollow++++", response);
      // dispatch(getUserInfo(id));
      // const notify = () => toast("Follow Removed Successfully");
      // notify();
      dispatch({
        type: t.POST_UNFOLLOW,
        payload: response.data,
      });
    })
    .catch((error) => {
      // console.log("postFollow++++ err", error);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();
      if (isDetailPage === true) {
        // manually update in getUser
        dispatch({
          type: t.FOLLOW_UNFOLLOW_MANUALLY_UPDATE_IN_GETUSERINFO,
          payload: {
            _id: Data?.userId,
            status: true,
          },
        });
      }
    });
};

export const getUserInfo = (id, setLoaderData) => (dispatch) => {
  postUserData(id)
    .then((response) => {
      // setLoaderData(true);
      console.log("getUserInfo++++", response);

      dispatch({
        type: t.GET_USER,
        payload: response.data,
      });
      if (isFunction(setLoaderData)) {
        setLoaderData(false);
      }
    })
    .catch((error) => {
      console.log("getUserInfo++++ err", error);
      // setLoaderData(true);
      if (isFunction(setLoaderData)) {
        setLoaderData(false);
      }
    });
};

export const postWishList = (Data, id, isDetailPage) => (dispatch) => {
  // console.log("daa getUserInfo");
  if (!isDetailPage) {
    // manually update in getAllStoreNft
    dispatch({
      type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETALLSTORENFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
  }

  if (isDetailPage === true) {
    // manually update in getNft
    dispatch({
      type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETNFT,
      payload: {
        id: Data?.nftId,
        status: true,
      },
    });
  }
  postWishlistData(Data)
    .then((response) => {
      // console.log("postWishList++++", response);
      // dispatch(getNFTData(id));

      // const notify = () => toast("Wishlist Added Successfully");
      // notify();
      dispatch({
        type: t.POST_WISHLIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("postWishList++++ err", error);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();
      if (!isDetailPage) {
        // manually update in getAllStoreNft
        dispatch({
          type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETALLSTORENFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
      }

      if (isDetailPage === true) {
        // manually update in getNft
        dispatch({
          type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETNFT,
          payload: {
            id: Data?.nftId,
            status: false,
          },
        });
      }
    });
};

export const delteCurrentWishlist = (Data) => (dispatch) => {
  deleteWishlistData(Data)
    .then((response) => {
      console.log("deleteWishlistInfo++++", response);
      dispatch(getCurrentUser());
      const notify = () => toast("Wishlist removed successfully");
      notify();
      // setLoader(false);
      dispatch({
        type: t.PUT_WISHLIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      // console.log("deleteWishlistInfo++++ err", error);
      // setLoader(false);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const deleteWishlistInfo = (Data, id, isDetailPage) => (dispatch) => {
  if (!isDetailPage) {
    // manually update in getAllStoreNft
    dispatch({
      type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETALLSTORENFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
  }

  if (isDetailPage === true) {
    // manually update in getNft
    dispatch({
      type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETNFT,
      payload: {
        id: Data?.nftId,
        status: false,
      },
    });
  }
  deleteWishlistData(Data)
    .then((response) => {
      // console.log("deleteWishlistInfo++++", response);
      // dispatch(getNFTData(id));

      // const notify = () => toast("Wishlist Removed Successfully");
      // notify();
      dispatch({
        type: t.PUT_WISHLIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("deleteWishlistInfo++++ err", error);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();
      if (!isDetailPage) {
        // manually update in getAllStoreNft
        dispatch({
          type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETALLSTORENFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
      }

      if (isDetailPage === true) {
        // manually update in getNft
        dispatch({
          type: t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETNFT,
          payload: {
            id: Data?.nftId,
            status: true,
          },
        });
      }
    });
};

export const clearallWishlist = (setLoader) => (dispatch) => {
  clearallWishlistData()
    .then((response) => {
      console.log("deleteWishlistInfo++++", response);
      dispatch(getCurrentUser());
      const notify = () => toast("Wishlist Cleared Successfully");
      notify();
      setLoader(false);
      dispatch({
        type: t.DELETE_WISHLIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      // console.log("deleteWishlistInfo++++ err", error);
      setLoader(false);
      let errorss = error?.response?.data;
      // console.log("errorss", errorss);
      let msgs = errorss?.errors?.map((e) => {
        return e.message + "\n";
      });
      // console.log("msgs++++", msgs);
      const notify = () => toast.error(msgs?.join(","));
      notify();
    });
};

export const hideCollections =
  (Value, Data, setBtnsubmit, setShowHideModal) => (dispatch) => {
    // console.log(" 00000000000000", Data);
    hideCollectionsData(Value, Data)
      .then((response) => {
        dispatch(getCollection());
        dispatch({
          type: t.PUT_HIDE_COLLECTION,
          payload: response.data,
        });
        // dispatch(getCollectionById(Data));
        // console.log("hideCollections++++", response?.data);
        // dispatch(getUserInfo(id));
        const notify = () => toast(response?.data?.message);
        notify();
        setBtnsubmit(false);
        setShowHideModal(false);
      })
      .catch((error) => {
        let msgs = error?.response.data?.map((e) => {
          return e.message + "\n";
        });
        const notify = () => toast.error(msgs?.join(","));
        notify();
        setBtnsubmit(false);
      });
  };

export const getCollectionById = (Data) => (dispatch) => {
  // console.log(" getCollectionByIdData", Data);
  getCollectionByIdData(Data)
    .then((response) => {
      console.log("getCollection", response);

      dispatch({
        type: t.GET_COLLECTION,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errcollection", error.response);
    });
};

export const getBlogCategory = () => (dispatch) => {
  // console.log(" 11111111111111111", Data);
  getBlogCategoryData()
    .then((response) => {
      // console.log("getCollection", response);

      dispatch({
        type: t.GET_BLOG_CATEGORY,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errcollection", error.response);
    });
};

export const getSocialMedia = () => (dispatch) => {
  // console.log(" 11111111111111111", Data);
  getSocialMediaData()
    .then((response) => {
      // console.log("getCollection", response);

      dispatch({
        type: t.GET_SOCIAL_MEDIA,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      // console.log("errcollection", error.response);
    });
};

export const postWithdrawAuctionBid =
  (Data, setBtnsubmit, id) => (dispatch) => {
    // console.log(" 11111111111111111", Data);
    postWithdrawAuctionBidData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("Withdraw Auction Bid Successfully");
        notify();
        setBtnsubmit(false);
        dispatch(getNFTData(id));

        dispatch({
          type: t.POST_WITHDRAW_AUCTION_BID,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        let msgs = error?.response?.data?.map((e) => {
          return e.message + "\n";
        });
        const notify = () => toast.error(msgs?.join(","));
        notify();
        setBtnsubmit(false);
        // console.log("errcollection", error.response);
      });
  };

export const postEndAuction =
  (Data, id, setWithdrawConfirm, setBtnsubmit) => (dispatch) => {
    // console.log(" 11111111111111111", Data);
    postEndAuctionData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("End Auction Successfully");
        notify();
        dispatch(getNFTData(id));
        setWithdrawConfirm(false);
        dispatch({
          type: t.POST_END_AUCTION,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while end auction!!");
        }
        setBtnsubmit(false);
      });
  };

export const addListingFee =
  (Data, setShareListingOpenLoader, setShareListingOpen) => (dispatch) => {
    // console.log(" 11111111111111111", Data);
    addListingFeeData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("Added Listing Fee Successfully");
        notify();

        setShareListingOpenLoader(false);
        setShareListingOpen(false);
        dispatch(getFeeData());
        dispatch({
          type: t.ADD_SHARE_LISTING_FEE,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while share listing fee!!");
        }
        setShareListingOpenLoader(false);
        setShareListingOpen(false);
      });
  };

export const editListingFee =
  (Data, SetshareListingEditLoader, setShareListingEdit) => (dispatch) => {
    // console.log(" 11111111111111111", Data);
    editListingFeeData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("Updated Listing Fee Successfully");
        notify();
        SetshareListingEditLoader(false);
        setShareListingEdit(false);

        dispatch(getFeeData());
        dispatch({
          type: t.EDIT_SHARE_LISTING_FEE,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while edited!!");
        }
        SetshareListingEditLoader(false);
        setShareListingEdit(false);
      });
  };

export const deleteListingFee =
  (Data, setShareListingDeleteLoader, setShareListingDelete) => (dispatch) => {
    // console.log(" 11111111111111111", Data);
    deleteListingFeeData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("Deleted Successfully");
        notify();
        // dispatch(getNFTData(id));
        setShareListingDeleteLoader(false);
        setShareListingDelete(false);
        dispatch(getFeeData());
        dispatch({
          type: t.DELETE_SHARE_LISTING_FEE,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while delete!!");
        }
        setShareListingDeleteLoader(false);
        setShareListingDelete(false);
      });
  };

export const postTransfer =
  (Data, setHandleModalOpen, setBtnsubmit, setConfrmTransfered) =>
  (dispatch) => {
    // console.log(" 11111111111111111", Data);
    postTransferData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        // const notify = () => toast("Added Listing Fee Successfully");
        // notify();
        setHandleModalOpen(false);
        setBtnsubmit(false);
        setConfrmTransfered(true);
        // dispatch(getNFTData(id));
        dispatch({
          type: t.POST_TRANSFER,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while transfering!!");
        }
        setHandleModalOpen(false);
        setBtnsubmit(false);
      });
  };

export const postMakeAnOffer =
  (
    Data,
    setMakeOfferModal,
    setBtnsubmit,
    id,
    setWalletOpen,
    setPrice,
    setSelectedDateValueForPickr
  ) =>
  (dispatch) => {
    // console.log(" 11111111111111111", Data);
    postMakeanOfferData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("Make an offer created successfully");
        notify();
        setMakeOfferModal(false);
        setBtnsubmit(false);
        dispatch(getNFTData(id));
        setWalletOpen(false);
        setPrice("");
        setSelectedDateValueForPickr("");
        // dispatch(getNFTData(id));
        dispatch({
          type: t.POST_MAKEANOFFER,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while make an offer!!");
        }
        setMakeOfferModal(false);
        setBtnsubmit(false);
        setWalletOpen(false);
      });
  };

export const postAcceptOffer =
  (Data, id, setWalletOpen, setAcceptLoader, setAcceptModal) => (dispatch) => {
    // console.log(" 11111111111111111", Data);
    postAcceptOfferData(Data)
      .then((response) => {
        // console.log("getCollection", response);
        const notify = () => toast("Offer accepted successfully");
        notify();
        setWalletOpen(false);
        setAcceptLoader(false);
        dispatch(getNFTData(id));
        setAcceptModal(false);
        dispatch({
          type: t.POST_ACCEPTOFFER,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log("error?.response?.data", error?.response?.data);
        // let msgs = error?.response?.data?.map((e) => {
        //   return e.message + "\n";
        // });
        // const notify = () => toast.error(msgs?.join(","));
        // notify();
        // console.log("errcollection", error.response);
        if (error?.response?.status === 400) {
          let errorss = error?.response?.data?.errors;
          let msgs = errorss?.map((e) => {
            return e.message + "\n";
          });
          const notify = () => toast.error(msgs?.join(","));
          notify();
        } else {
          toast.error("Error while accepted offer!!");
        }
        setWalletOpen(false);
        setAcceptLoader(false);
      });
  };

export const putCancelOffer = (Data, id, setCancelModal) => (dispatch) => {
  // console.log(" 11111111111111111", Data);
  putCancelOfferData(Data)
    .then((response) => {
      // console.log("getCollection", response);
      const notify = () => toast("Offer canceled successfully");
      notify();
      setCancelModal(false);
      // setBtnsubmit(false);
      dispatch(getNFTData(id));
      // setWalletOpen(false);
      // dispatch(getNFTData(id));
      dispatch({
        type: t.PUT_CANCELOFFER,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      console.log("error?.response?.data", error?.response?.data);
      // let msgs = error?.response?.data?.map((e) => {
      //   return e.message + "\n";
      // });
      // const notify = () => toast.error(msgs?.join(","));
      // notify();
      // console.log("errcollection", error.response);
      if (error?.response?.status === 400) {
        let errorss = error?.response?.data?.errors;
        let msgs = errorss?.map((e) => {
          return e.message + "\n";
        });
        const notify = () => toast.error(msgs?.join(","));
        notify();
      } else {
        toast.error("Error while canceled offer!!");
      }
      setCancelModal(false);
    });
};
