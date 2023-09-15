import SEO from "@components/seo";
import clsx from "clsx";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro";
import AuthorProfileArea from "@containers/author-profile";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserNFT, getUserInfo } from "src/redux/actions/main";
// Demo data
import authorData from "../../data/author.json";
import productData from "../../data/products.json";
import {
  getContract,
  getCollection,
  getAllStoreNfts,
  getCurrentStore,
  getTopCollections,
  getTopNfts,
  getAuctionNft,
  updateLoader,
  getHomeData,
  getBlogsData,
} from "src/redux/actions/main";
import Loader from "@containers/loader";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const User = ({
  nftData,
  userNftData,
  getUser,
  loaders,
  getStore,
  getUsersInfo,
}) => {
  const [loaderData, setLoaderData] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (getStore === "") {
      dispatch(updateLoader(true));
      dispatch(getHomeData());
      dispatch(getCurrentStore());
      dispatch(getContract());
      dispatch(getCollection());
      dispatch(getAllStoreNfts());
      dispatch(getTopCollections());
      dispatch(getTopNfts());
      dispatch(getBlogsData());
      dispatch(getAuctionNft());
    }
  }, [getStore]);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserNFT(router.query.id, setLoaderData));
    dispatch(getUserInfo(router.query.id, setLoaderData));
  }, [router]);

  let UserNFT = "";
  let ownerDetails = {};
  try {
    const product = nftData.filter(({ userId }) =>
      userId.includes(router.query.id)
    );
    UserNFT = product[0];
    ownerDetails = UserNFT.users_details.find((x) => x._id == router.query.id);
  } catch (e) {
    // console.log(e);
  }
  // console.log("SumithNFT", userNftData);
  // console.log("nftData", nftData);
  // console.log("id", router.query.id);
  // const Data = {
  //   id: UserNFT?.userId,
  //   cover: UserNFT?.coverOfSeller,
  //   profile: UserNFT?.profileOfSeller,
  //   name: UserNFT?.nameOfSeller,
  //   // email: UserNFT.emailOfSeller,
  //   // usernameOfSeller,
  //   bio: UserNFT?.bio,
  // };
  // console.log("getUsersInfo++++++++++++", getUsersInfo);
  // console.log("UserNFT++++++++++++", UserNFT);

  const Data = {
    id: getUsersInfo?._id,
    cover: getUsersInfo?.cover,
    profile: getUsersInfo?.profile,
    name: getUsersInfo?.name,
    // email: UserNFT.emailOfSeller,
    // usernameOfSeller,
    bio: getUsersInfo?.bio,
  };
  if (loaders) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
          <AuthorIntroArea
            getName={Data}
            data={authorData}
            userId={getUser?.id}
            secondUserId={router.query.id}
            getUsersInfo={getUsersInfo}
            ownerDetails={ownerDetails}
            setLoaderData={setLoaderData}
            loaderData={loaderData}
          />
          <AuthorProfileArea
            data={{ products: productData }}
            myNft={userNftData}
            userId={UserNFT?.userId}
            setLoaderData={setLoaderData}
            loaderData={loaderData}
          />
        </main>
        <Footer />
      </Wrapper>
    );
  }
};
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}
const mapStateToProps = (state) => {
  return {
    // getName: state.main.getCurrentUser,
    userNftData: state.main.getUserNFT,
    nftData: state.main.getAllStoreNft,
    getUser: state.main.getCurrentUser,
    loader: state.main.loader,
    getStore: state.main.getCurrentStoreData,
    getUsersInfo: state.main.getUser?.data?.user,
  };
};
export default connect(mapStateToProps)(User);
