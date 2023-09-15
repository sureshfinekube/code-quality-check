import * as t from "../types";

const INIT_STATE = {
  productData: {},
  homepageData: {},
  collectionsData: "",
  userData: {},
  islogin: false,
  logoutData: {},
  createCollection: {},
  getContract: {},
  nftData: "",
  myNft: "",
  // getCollection: {},
  getAllStoreNft: "",
  getCurrentUser: "",
  getCurrentStoreData: "",
  getTopCollectionsData: "",
  getTopNftsData: "",
  getMyCollections: "",
  SellNft: "",
  getCollectionsNFT: "",
  BuyData: "",
  updatedNFT: "",
  getNFT: "",
  getUserNFT: "",
  auctionNFT: "",
  viewNFTBids: "",
  ApproveNFTBids: "",
  viewUserData: "",
  canceNFT: "",
  dashboard: "",
  History: "",
  searchkey: "",
  getFee: "",
  updateFee: "",
  loader: true,
  bidplace: "",
  cancelbid: "",
  AddAuctionOfferData: "",
  ApproveAuctionOfferData: "",
  CancelAuctionOfferData: "",
  getBlogs: "",
  updatedCollection: "",
  getPages: "",
  getNotifications: [],
  updateNotification: "",
  postNotification: "",
  getNotificationSettings: "",
  report: "",
  searchHistory: "",
  postSearchHistory: "",
  deleteSearchHistory: "",
  postLike: "",
  postUnlike: "",
  postFollow: "",
  postUnFollow: "",
  getUser: "",
  getWishlist: [],
  postWishlist: "",
  deleteWishlist: "",
  hideCollections: "",
  getCollectionsId: "",
  getBlogCategory: "",
  getSocailMedia: "",
  postWithdrawAuctionBid: "",
  postEndAuction: "",
  postListingFee: "",
  editListingFee: "",
  deleteListingFee: "",
  postTransfer: "",
  postMakeAnOffer: "",
  postAcceptOffer: "",
  putCancelOffer: "",
};
const main = (state = INIT_STATE, action) => {
  switch (action.type) {
    case t.GET_PRODUCT_DATA:
      return {
        ...state,
        productData: action.payload,
      };
    case t.GET_HOME_DATA:
      return {
        ...state,
        homepageData: action.payload,
      };
    case t.GET_COLLECTION_DATA:
      return {
        ...state,
        collectionsData: action.payload,
      };
    case t.POST_LOGIN_DATA:
      // console.log("tijoreducer");
      return {
        ...state,
        userData: action.payload,
        islogin: true,
      };
    case t.LOGOUT_ACTION:
      // console.log("tijoreducer");
      return {
        ...state,
        islogin: false,
        userData: {},
        getCurrentUser: "",
        myNft: "",
        getMyCollections: "",
        getNotifications: [],
      };

    case t.UPDATE_PROFILE:
      return {
        ...state,
        userData: action.payload,
      };
    case t.POST_CREATE_COLLECTION_DATA:
      // console.log("tijoreducer");
      return {
        ...state,
        createCollection: action.payload,
      };
    case t.GET_CONTRACT_DATA:
      // console.log("tijoreducer");
      return {
        ...state,
        getContract: action.payload,
      };
    case t.GET_FEE:
      // console.log("tijoreducer");
      return {
        ...state,
        getFee: action.payload,
      };
    case t.UPDATE_FEE:
      // console.log("tijoreducer");
      return {
        ...state,
        updateFee: action.payload,
      };
    case t.POST_NFT:
      // console.log("tijoreducer");
      return {
        ...state,
        nftData: action.payload,
      };
    case t.GET_MY_NFT:
      return {
        ...state,
        myNft: action.payload,
      };

    case t.GET_HISTORY:
      return {
        ...state,
        History: action.payload,
      };

    case t.GET_ALL_STORE_NFTS:
      // console.log("tijoreducer");
      if (action.isPaginating) {
        return {
          ...state,
          getAllStoreNft: [...state.getAllStoreNft, ...action.payload],
        };
      } else {
        return {
          ...state,
          getAllStoreNft: action.payload,
        };
      }
    case t.GET_CURRENT_USER:
      // console.log("tijoreducer");
      return {
        ...state,
        getCurrentUser: action.payload,
      };
    case t.GET_CURRENT_STORE_DATA:
      // console.log("elonreducer");
      return {
        ...state,
        getCurrentStoreData: action.payload,
      };

    case t.GET_TOP_COLLECTIONS_DATA:
      // console.log("tijoreducer");
      return {
        ...state,
        getTopCollectionsData: action.payload,
      };
    case t.GET_TOP_NFTS_DATA:
      // console.log("tijoreducer");
      return {
        ...state,
        getTopNftsData: action.payload,
      };
    case t.GET_MY_COLLECTIONS_DATA:
      // console.log("tijoreducer");
      return {
        ...state,
        getMyCollections: action.payload,
      };
    case t.SELL_NFT:
      // console.log("tijoreducer");
      return {
        ...state,
        SellNft: action.payload,
      };
    case t.GET_MY_COLLECTIONS_NFT:
      // console.log("tijoreducer");
      return {
        ...state,
        getCollectionsNFT: action.payload,
      };
    case t.BUY_NFT:
      // console.log("tijoreducer");
      return {
        ...state,
        BuyData: action.payload,
      };
    case t.PLACE_BID:
      // console.log("tijoreducer");
      return {
        ...state,
        bidplace: action.payload,
      };
    case t.GET_SEARCH:
      // console.log("tijoreducer");
      return {
        ...state,
        searchkey: action.payload,
      };
    case t.GET_BLOGS:
      // console.log("tijoreducer");
      return {
        ...state,
        getBlogs: action.payload,
      };
    case t.UPDATE_NFT:
      // console.log("tijoreducer");
      return {
        ...state,
        updatedNFT: action.payload,
      };
    case t.UPDATE_COLLECTION:
      // console.log("tijoreducer");
      return {
        ...state,
        updatedCollection: action.payload,
      };
    case t.DELETE_COLLECTION:
      return {
        ...state,
      };
    case t.GET_NFT:
      return {
        ...state,
        getNFT: action.payload,
      };
    case t.GET_PAGES:
      return {
        ...state,
        getPages: action.payload,
      };
    case t.GET_USER_NFT:
      // console.log("tijoreducer");
      return {
        ...state,
        getUserNFT: action.payload,
      };
    case t.MAKE_BID:
      return {
        ...state,
      };
    case t.DELETE_NFT:
      return {
        ...state,
      };
    case t.GET_AUCTION_NFT:
      return {
        ...state,
        auctionNFT: action.payload,
      };
    case t.VIEW_NFT_BIDS:
      return {
        ...state,
        viewNFTBids: action.payload,
      };
    case t.APPROVE_NFT_BIDS:
      return {
        ...state,
        ApproveNFTBids: action.payload,
      };
    case t.VIEW_USER_DATA:
      return {
        ...state,
        viewUserData: action.payload,
      };
    case t.CANCEL_NFT_DATA:
      return {
        ...state,
        canceNFT: action.payload,
      };
    case t.CANCEL_BID_DATA:
      return {
        ...state,
        cancelbid: action.payload,
      };
    case t.ADD_AUCTION_OFFER:
      return {
        ...state,
        AddAuctionOfferData: action.payload,
      };
    case t.APPROVE_AUCTION_OFFER:
      return {
        ...state,
        ApproveAuctionOfferData: action.payload,
      };
    case t.CANCEL_AUCTION_OFFER:
      return {
        ...state,
        CancelAuctionOfferData: action.payload,
      };
    case t.GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };
    case t.LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case t.GET_HOME_EXPLORE_NFTS:
      return {
        ...state,
        getHomeExploreNfts: action.payload,
      };
    case t.GET_NOTIFICATIONS:
      return {
        ...state,
        getNotifications: action.payload,
      };
    case t.UPDATE_NOTIFICATION:
      return {
        ...state,
        updateNotification: action.payload,
      };
    case t.POST_NOTIFICATION:
      return {
        ...state,
        postNotification: action.payload,
      };
    case t.GET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        getNotificationSettings: action.payload,
      };
    case t.REPORT:
      return {
        ...state,
        report: action.payload,
      };
    case t.GET_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: action.payload,
      };
    case t.POST_SEARCH_HISTORY:
      return {
        ...state,
        postSearchHistory: action.payload,
      };
    case t.DELETE_SEARCH_HISTORY:
      return {
        ...state,
        deleteSearchHistory: action.payload,
      };
    case t.POST_LIKE:
      return {
        ...state,
        postLike: action.payload,
      };
    case t.POST_UNLIKE:
      return {
        ...state,
        postUnlike: action.payload,
      };
    case t.POST_FOLLOW:
      return {
        ...state,
        postFollow: action.payload,
      };
    case t.POST_UNFOLLOW:
      return {
        ...state,
        postUnFollow: action.payload,
      };
    case t.GET_USER:
      return {
        ...state,
        getUser: action.payload,
      };
    case t.POST_WISHLIST:
      return {
        ...state,
        postWishlist: action.payload,
      };

    case t.PUT_WISHLIST:
      return {
        ...state,
        deleteWishlist: action.payload,
      };
    case t.DELETE_WISHLIST:
      return {
        ...state,
        // clearWishlist: action.payload,
      };
    case t.PUT_HIDE_COLLECTION:
      return {
        ...state,
        hideCollections: action.payload,
      };
    case t.GET_COLLECTION:
      return {
        ...state,
        getCollectionsId: action.payload,
      };
    case t.POST_TRANSFER:
      return {
        ...state,
        postTransfer: action.payload,
      };
    case t.POST_MAKEANOFFER:
      return {
        ...state,
        postMakeAnOffer: action.payload,
      };
    case t.POST_ACCEPTOFFER:
      return {
        ...state,
        postAcceptOffer: action.payload,
      };
    case t.PUT_CANCELOFFER:
      return {
        ...state,
        putCancelOffer: action.payload,
      };
    case t.BUY_SELL_MANUALLY_UPDATE_IN_GETALLSTORENFT:
      return {
        ...state,
        ...(state.getAllStoreNft.length && {
          getAllStoreNft: state.getAllStoreNft.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  listed: action.payload.status,
                  status: action.payload.status,
                  price: action.payload.price,
                  startingPrice: action.payload.startingPrice,
                }
              : nft
          ),
        }),
      };
    case t.BUY_SELL_MANUALLY_UPDATE_IN_GET_NFT:
      return {
        ...state,
        ...(state.getNFT?.length && {
          getNFT: state.getNFT.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  listed: action.payload.status,
                  status: action.payload.status,
                  price: action.payload.price,
                  startingPrice: action.payload.startingPrice,
                }
              : nft
          ),
        }),
      };
    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETALLSTORENFT:
      return {
        ...state,
        ...(state.getAllStoreNft?.length && {
          getAllStoreNft: state.getAllStoreNft.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };
    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETTOPNFT:
      return {
        ...state,
        ...(state.getTopNftsData?.length && {
          getTopNftsData: state.getTopNftsData.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };
    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETAUCTIONNFT:
      return {
        ...state,
        ...(state.auctionNFT?.length && {
          auctionNFT: state.auctionNFT.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };
    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETHOMEEXPLORENFT:
      return {
        ...state,
        ...(state.getHomeExploreNfts?.length && {
          getHomeExploreNfts: state.getHomeExploreNfts.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };
    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_getUserNFT:
      return {
        ...state,
        ...(state.getUserNFT?.length && {
          getUserNFT: state.getUserNFT.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };

    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETNFT:
      return {
        ...state,
        ...(state.getNFT?.length && {
          getNFT: state.getNFT.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };

    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GETMYNFT:
      return {
        ...state,
        ...(state.myNft?.length && {
          myNft: state.myNft.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };

    case t.LIKE_UNLIKE_MANUALLY_UPDATE_IN_GetCollectionsNFT:
      return {
        ...state,
        ...(state.getCollectionsNFT?.length && {
          getCollectionsNFT: state.getCollectionsNFT.map((nft, i) =>
            nft.id === action.payload.id
              ? {
                  ...nft,
                  isLiked: action.payload.status,
                  ...(action.payload.status === true
                    ? { likes_count: nft.likes_count + 1 }
                    : { likes_count: nft.likes_count - 1 }),
                }
              : nft
          ),
        }),
      };

    case t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETALLSTORENFT:
      return {
        ...state,
        getAllStoreNft: Array.from(state.getAllStoreNft).map((nft, i) =>
          nft.id === action.payload.id
            ? {
                ...nft,
                isAddedToWishlist: action.payload.status,
                ...(action.payload.status === true
                  ? { isAddedToWishlist: true }
                  : { isAddedToWishlist: false }),
              }
            : nft
        ),
      };
    case t.WISHLIST_UNWISHLIST_MANUALLY_UPDATE_IN_GETNFT:
      return {
        ...state,
        getNFT: Array.from(state.getNFT).map((nft, i) =>
          nft.id === action.payload.id
            ? {
                ...nft,
                isAddedToWishlist: action.payload.status,
                ...(action.payload.status === true
                  ? { isAddedToWishlist: true }
                  : { isAddedToWishlist: false }),
              }
            : nft
        ),
      };
    case t.FOLLOW_UNFOLLOW_MANUALLY_UPDATE_IN_GETUSERINFO:
      return {
        ...state,
        getUser: {
          data: {
            status: true,
            user: {
              ...state.getUser.data.user,
              ...(action.payload.status === true
                ? {
                    isFollowing: true,
                    follower_count: state.getUser.data.user.follower_count + 1,
                  }
                : {
                    isFollowing: false,
                    follower_count: state.getUser.data.user.follower_count - 1,
                  }),
            },
          },
          // ...state.getUser,
          // ...(action.payload.status === true
          //   ? { isFollowing: true }
          //   : { isFollowing: false }),
        },
        postNotification: {
          messi: true,
        },
      };
    case t.GET_BLOG_CATEGORY:
      return {
        ...state,
        getBlogCategory: action.payload,
      };
    case t.GET_SOCIAL_MEDIA:
      return {
        ...state,
        getSocailMedia: action.payload,
      };
    case t.POST_WITHDRAW_AUCTION_BID:
      return {
        ...state,
        postWithdrawAuctionBid: action.payload,
      };
    case t.POST_END_AUCTION:
      return {
        ...state,
        postEndAuction: action.payload,
      };
    case t.ADD_SHARE_LISTING_FEE:
      return {
        ...state,
        postListingFee: action.payload,
      };
    case t.EDIT_SHARE_LISTING_FEE:
      return {
        ...state,
        editListingFee: action.payload,
      };
    case t.DELETE_SHARE_LISTING_FEE:
      return {
        ...state,
        deleteListingFee: action.payload,
      };
    default:
      return { ...state };
  }
};
export default main;
