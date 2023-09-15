import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog/layout-02";
import { connect, useSelector } from "react-redux";
import { getBlogsData } from "src/redux/actions/main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateLoader,
  getHomeData,
  getCurrentStore,
  getContract,
  getCollection,
  getTopCollections,
  getTopNfts,
  getAuctionNft,
} from "src/redux/actions/main";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import { getAllPosts } from "../../lib/api";

const POSTS_PER_PAGE = 8;
export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const Blog = ({ posts, pagiData, getBlog, getStore }) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.main.loader);

  //   useEffect(() => {
  //     // console.log("123");
  //     dispatch(getBlogsData());
  //     // dispatch(getAllStoreNfts());
  //   }, []);
  //   console.log("getBlog", getBlog);

  useEffect(() => {
    if (getStore === "") {
      dispatch(updateLoader(true));
      dispatch(getHomeData());
      dispatch(getCurrentStore());
      dispatch(getBlogsData());
      dispatch(getContract());
      dispatch(getCollection());
      dispatch(getTopCollections());
      dispatch(getTopNfts());
      dispatch(getAuctionNft());
    }
  }, [getStore]);

  return (
    <Wrapper>
      <SEO pageTitle="Blog" />

      <Header />
      <main id="main-content">
        <Breadcrumb pageTitle="Blogs" currentPage="Blogs" />

        <BlogArea data={{ getBlog, pagiData }} />
      </main>
      <Footer />
    </Wrapper>
  );
};

// export async function getStaticProps() {
//   const posts = getAllPosts([
//     "title",
//     "date",
//     "slug",
//     "image",
//     "category",
//     "timeToRead",
//   ]);

//   return {
//     props: {
//       posts: posts.slice(0, POSTS_PER_PAGE),
//       className: "template-color-1",
//       pagiData: {
//         currentPage: 1,
//         numberOfPages: Math.ceil(posts.length / POSTS_PER_PAGE),
//       },
//     },
//   };
// }

// Blog.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.shape({})),
//   pagiData: PropTypes.shape({}),
// };

const mapStateToProps = (state) => {
  return {
    myStore: state.main.getCurrentStoreData,
    getBlog: state.main.getBlogs.blogs,
    User: state.main.getCurrentUser,
    getStore: state.main.getCurrentStoreData,
  };
};

export default connect(mapStateToProps)(Blog);
