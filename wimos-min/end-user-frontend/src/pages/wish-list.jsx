import SEO from "@components/seo";
import { useEffect } from "react";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Loader from "@containers/loader";
import Wishlist from "@containers/wishlist";

//Redux
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
import { wrapper } from "src/redux/store";
import { useSelector } from "react-redux";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const WishLIst = (props) => {
  const dispatch = useDispatch();
  const loaders = useSelector((state) => state.main.loader);
  const storedata = useSelector((state) => state.main.getCurrentStoreData);

  useEffect(() => {
    if (storedata === "") {
      dispatch(updateLoader(true));
      dispatch(getHomeData());
      dispatch(getCurrentStore());
      dispatch(getContract());
      dispatch(getCollection());
      dispatch(getAllStoreNfts());
      dispatch(getTopCollections());
      dispatch(getTopNfts());
      dispatch(getAuctionNft());
      dispatch(getBlogsData());
    }
  }, [storedata]);
  const router = useRouter();
  const { isAuthenticated } = useMoralis();
  useEffect(() => {
    // console.log("isAuthenticated wishhhh", isAuthenticated);
    // console.log("storedata wishhhh", storedata);

    let userToken = localStorage.getItem("e_wimos");

    if (!isAuthenticated && !userToken) {
      router.push("/");
    }
  }, [isAuthenticated]);
  if (loaders) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <SEO pageTitle="wishlist" />
        <Header />
        <main id="main-content">
          <Breadcrumb pageTitle="My wishlist" currentPage="My wishlist" />
          <br />
          <Wishlist />
        </main>
        <Footer />
      </Wrapper>
    );
  }
};
export default WishLIst;
