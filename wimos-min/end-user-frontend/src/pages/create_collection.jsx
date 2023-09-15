import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CreateCollection from "@components/collection/create_collection";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
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
} from "../redux/actions/main";
import { useDispatch } from "react-redux";
import Loader from "@containers/loader";
export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const Create = ({ getUser, getStore, loaders }) => {
  const router = useRouter();
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
  useEffect(() => {
    // console.log("out if", getUser?.metamaskId, "jk", getStore?.metamaskId);
    if (getUser && getStore) {
      if (
        getUser?.metamaskId !== getStore?.metamaskId &&
        getStore?.type === "single_store"
      ) {
        // console.log("in if");
        router.push("/404");
      }
    }
  }, [getUser, getStore]);
  if (loaders) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <SEO pageTitle="Create" />
        <Header />
        <main id="main-content">
          <Breadcrumb
            pageTitle="Create Your Collection"
            currentPage="Create Your Collection"
          />
          <CreateCollection />
        </main>
        <Footer />
      </Wrapper>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    getStore: state.main.getCurrentStoreData,
    getUser: state.main.getCurrentUser,
    loader: state.main.loader,
  };
};

export default connect(mapStateToProps)(Create);
