import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro";
import AuthorProfileArea from "@containers/author-profile";
import { connect } from "react-redux";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
// Demo data
import authorData from "../data/author.json";
import productData from "../data/products.json";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const Author = ({ getName, myNft, loaders, getStore }) => {
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
  const { isAuthenticated } = useMoralis();
  useEffect(() => {
    let userToken = localStorage.getItem("e_wimos");

    // console.log("isAuthenticated--------->", isAuthenticated);
    if (!isAuthenticated && !userToken) {
      router.push("/");
    }
  }, [isAuthenticated]);
  if (loaders) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
          <AuthorIntroArea
            getName={getName}
            data={authorData}
            userId={getName.id}
          />
          <AuthorProfileArea
            data={{ products: productData }}
            myNft={myNft}
            userId={getName.id}
          />
        </main>
        <Footer />
      </Wrapper>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    getName: state.main.getCurrentUser,
    myNft: state.main.myNft,
    loader: state.main.loader,
    getStore: state.main.getCurrentStoreData,
  };
};
export default connect(mapStateToProps)(Author);
