import { useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//Redux
import {
  getContract,
  getCollection,
  getCurrentStore,
  getTopCollections,
  getTopNfts,
  getAuctionNft,
  updateLoader,
  getAllStoreNfts,
  getHomeData,
  getBlogsData,
} from "../redux/actions/main";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { wrapper } from "src/redux/store";
import Loader from "@containers/loader";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const Collection = ({ props, loaders }) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.main.loader);
  const storedata = useSelector((state) => state.main.getCurrentStoreData);

  useEffect(() => {
    if (storedata === "") {
      dispatch(updateLoader(true));
      dispatch(getHomeData());
      dispatch(getCurrentStore());
      dispatch(getContract());
      dispatch(getAllStoreNfts());
      dispatch(getTopCollections());
      dispatch(getTopNfts());
      dispatch(getBlogsData());
      dispatch(getAuctionNft());
      dispatch(getCollection());
    }
  }, [storedata]);

  if (loaders) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <SEO pageTitle="Collection" />

        <Header />

        <main id="main-content">
          <Breadcrumb pageTitle="Collections" currentPage="Collections" />

          <CollectionArea />
        </main>
        <Footer />
      </Wrapper>
    );
  }
};
export default Collection;
