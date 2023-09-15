import axios from "axios";
// import swal from "sweetalert";

// let BaseUrl = "https://nft-user.herokuapp.com/v1";
// let BaseUrl = "https://portal.wimos.io/v1";
// let BaseUrl = "https://endapi.wimos.io/v1";
// let BaseUrl = "http://localhost:8080/v1";
let BaseUrl = "";
if (process.env.NEXT_PUBLIC_ENV === "DEV") {
  BaseUrl = process.env.NEXT_PUBLIC_DEV_API_URL;
} else if (process.env.NEXT_PUBLIC_ENV === "LOCAL") {
  BaseUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
} else if (process.env.NEXT_PUBLIC_ENV === "PRODUCTION") {
  BaseUrl = process.env.NEXT_PUBLIC_PROD_API_URL;
}

// const instance = axios.create({
//   // .. where we make our configurations
//   baseURL: BaseUrl,
//   withCredentials: true,
//   credentials: true,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     // Origin: window.location.hostname,
//   },
// });

let instance = axios.create({
  // .. where we make our configurations
  baseURL: BaseUrl,
  withCredentials: true,
  credentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Origin: window.location.hostname,
  },
});

function createAxiosInstance() {
  instance = axios.create({
    // .. where we make our configurations
    baseURL: BaseUrl,
    // withCredentials: true,
    // credentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Origin: window.location.hostname,
      Authorization: `Bearer ${localStorage.getItem("e_wimos")}`,
    },
  });
}

export function login(Data) {
  createAxiosInstance();
  return instance.post(`/auth/login`, Data);
}

export function logoutAction() {
  //axios call
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.post(`/auth/logout`);
}

export function UpdateProfileData(Data) {
  // console.log("sdjnnhj", Data);
  createAxiosInstance();
  return instance.put(`/auth/update-profile`, Data);
}

export function UpdateProfileDataImage(Data) {
  //console.log("sdjnnhj", Data);
  createAxiosInstance();
  return instance.put(`/auth/update-profile-images`, Data);
}

export function CreateCollection(data) {
  //axios call
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.post(`/collections/create`, data);
}

export function getContractData() {
  //axios call
  createAxiosInstance();

  return instance.get(`/contract/get-contracts`);
}

export function getCollectionDatas() {
  //axios call
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.get(`/collections/all`);
}

export function createNftPost(Data) {
  createAxiosInstance();
  return instance.post(`/nft/create`, Data);
}

export function getMyNft() {
  createAxiosInstance();
  return instance.get(`/nft/mynfts`);
}

export function getAllStoreNftsData({
  collection,
  category,
  sale_type,
  price,
  page,
}) {
  // console.log("tijooapi");
  createAxiosInstance();
  let first_price = price && price.length ? price[0] : "";
  let last_price = price && price.length ? price[1] : "";

  return instance.get(
    `/nft/get?category=${category}&collection=${collection}&sale_type=${sale_type}&price_1=${first_price}&price_2=${last_price}&page=${page}`
  );
}

export function getCurrentUserData() {
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.get(`/auth/current-user`);
}

export function getCurrentStoreData() {
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.get(`/auth/current-store`);
}

export function getTopCollectionsData() {
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.get(`/collections/top`);
}

export function getTopNftsData() {
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.get(`/nft/top`);
}

export function getMyCollectionsData() {
  // console.log("tijooapi");
  createAxiosInstance();
  return instance.get(`/collections/mycollections`);
}

export function SellNFT(Data) {
  createAxiosInstance();
  return instance.put(`/nft/sellnft`, Data);
}

export function getMyCollectionsNFTData(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/nft/collection/` + data);
}
export function BuyNFT(Data) {
  createAxiosInstance();
  return instance.post(`/nft/buy`, Data);
}

export function getUpdateNft(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.put(`/nft/update`, data);
}

export function getNFT(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/nft/` + data);
}

export function getUserNFTData(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/e2c-c2e/get-user-nfts/` + data);
}

export function makeBidData(data) {
  createAxiosInstance();
  return instance.post(`/nft/make-bid`, data);
}

export function deleteNft(data) {
  createAxiosInstance();
  return instance.delete(`/nft/burn-nft`, { data });
}

export function getAuctionData() {
  createAxiosInstance();
  return instance.get(`/nft/auction-nfts`);
}

export function ViewNFTBidsData(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/nft/view-bids/` + data);
}

export function ApproveNFTBidsData(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.post(`/nft/approve-bid`, data);
}

export function ViewUser(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/auth/get-user/` + data);
}

export function CancelNFT(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.put(`/nft/cancel-listing`, data);
}

export function getDashboardData() {
  createAxiosInstance();
  return instance.get(`/e2c-c2e/home-page`);
}

export function getHistoryData(data) {
  createAxiosInstance();
  return instance.get(`/nft/history/` + data);
}

export function searchData(data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.post(`/nft/search`, data);
}

export function updateFee(Data) {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.put(`/auth/listing-fee`, Data);
}

export function getFee() {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/auth/listing-fee`);
}

export function placeaBid(Data) {
  createAxiosInstance();
  return instance.put(`/nft/bid-offer`, Data);
}

export function CancelBid(Data) {
  createAxiosInstance();
  return instance.put("/nft/cancel-offer", Data);
}

export function AddAuctionOfferData(Data) {
  createAxiosInstance();
  return instance.put("/nft/auction-offer", Data);
}
export function CancelAuctionOfferData(Data) {
  createAxiosInstance();
  return instance.put("/nft/cancel-auction-offer", Data);
}

export function ApproveAuctionOfferData(Data) {
  createAxiosInstance();
  return instance.put("/nft/approve-auction", Data);
}

export function getHomeExploreNftsData() {
  createAxiosInstance();

  return instance.get("/nft/home-explore");
}
export function getBlogs() {
  // console.log("tijooapi", data);
  createAxiosInstance();
  return instance.get(`/e2c-c2e/blogs`);
}

export function UpdateCollection(Data, id) {
  createAxiosInstance();
  return instance.put(`/collection/${id}`, Data);
}

export function deleteCollection(id) {
  createAxiosInstance();
  return instance.delete(`/collection/${id}`);
}

export function getPages() {
  // console.log("getPages", data);
  createAxiosInstance();
  return instance.get(`/e2c-c2e/pages`);
}

export function getNotifications() {
  // console.log("getNotifications", data);
  createAxiosInstance();
  return instance.get(`/user/notifications`);
}

export function updateNotification(Data) {
  // console.log("updateNotification", Data);
  createAxiosInstance();
  return instance.put(`/user/notification`, Data);
}

export function postNotification(Data) {
  createAxiosInstance();
  return instance.put(`/user/notification-settings`, Data);
}

export function postNotificationSettingsData() {
  createAxiosInstance();
  return instance.get(`/user/notification-settings`);
}
export function report(Data) {
  createAxiosInstance();
  return instance.put(`/user/report`, Data);
}

export function getSearchHistoryData() {
  createAxiosInstance();
  return instance.get(`/user/search-history`);
}

export function postSearchHistoryData(Data) {
  createAxiosInstance();
  return instance.post(`/user/search-history`, Data);
}

export function deleteSearchHistoryData() {
  createAxiosInstance();
  return instance.delete(`/user/search-history`);
}

export function postLikeData(Data) {
  createAxiosInstance();
  return instance.post(`/nft/like`, Data);
}
export function postUnLikeData(Data) {
  createAxiosInstance();
  return instance.post(`/nft/unlike`, Data);
}

export function postFollowData(Data) {
  createAxiosInstance();
  return instance.put(`/user/follow`, Data);
}
export function postUnFollowData(Data) {
  createAxiosInstance();
  return instance.put(`/user/unfollow`, Data);
}

export function postUserData(id) {
  createAxiosInstance();
  return instance.get(`/auth/get-user/${id}`);
}

export function postWishlistData(Data) {
  createAxiosInstance();
  return instance.post(`/user/wishlist`, Data);
}

export function deleteWishlistData(Data) {
  createAxiosInstance();
  return instance.put(`/user/wishlist/${Data.nftId}`);
}

export function clearallWishlistData() {
  createAxiosInstance();
  return instance.delete(`/user/wishlist`);
}

export function hideCollectionsData(Value, Data) {
  createAxiosInstance();
  return instance.put(`/collection/visibility/${Data}`, Value);
}

export function getCollectionByIdData(Data) {
  // console.log(" 2222222222222222222222", Data);
  createAxiosInstance();
  return instance.get(`/collection/${Data}`);
}

export function getBlogCategoryData() {
  createAxiosInstance();
  return instance.get(`/e2c-c2e/blog-categories`);
}

export function getSocialMediaData() {
  createAxiosInstance();
  return instance.get(`/e2c-c2e/social-media`);
}

export function postWithdrawAuctionBidData(Data) {
  createAxiosInstance();
  return instance.put(`/nft/withdraw-auction-bid`, Data);
}

export function postEndAuctionData(Data) {
  createAxiosInstance();
  return instance.post(`/nft/end-auction`, Data);
}

export function addListingFeeData(Data) {
  createAxiosInstance();
  return instance.post(`/e2c-c2e/listing-fee-recipient`, Data);
}
export function editListingFeeData(Data) {
  createAxiosInstance();
  return instance.put(`/e2c-c2e/listing-fee-recipient`, Data);
}
export function deleteListingFeeData(id) {
  createAxiosInstance();
  return instance.delete(`/e2c-c2e/listing-fee-recipient/${id}`);
}

export function postTransferData(Data) {
  createAxiosInstance();
  return instance.post(`/nft/transfer`, Data);
}

export function postMakeanOfferData(Data) {
  createAxiosInstance();
  return instance.post(`/nft/offer`, Data);
}

export function postAcceptOfferData(Data) {
  createAxiosInstance();
  return instance.post(`/nft/accept-offer`, Data);
}

export function putCancelOfferData(Data) {
  createAxiosInstance();
  return instance.put(`/nft/cancel-make-offer`, Data);
}
