import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import { connect, useSelector } from "react-redux";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
// import { getAllPosts, getPostBySlug } from "../../lib/api";
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
  getPagesData,
} from "src/redux/actions/main";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
// import * as DOMPurify from "dompurify";
import DOMPurify from "isomorphic-dompurify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}
const ViewPages = ({ getStore, getPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loader = useSelector((state) => state.main.loader);
  const { theme } = useTheme();

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
      dispatch(getAuctionNft());
      dispatch(getPagesData(router.query.id));
    }
  }, [getStore]);
  let pages = "";
  try {
    // console.log("id", router.query.id);
    pages = getPage.filter(({ id }) => id.includes(router.query.id));
    const blog = pages[0];
    pages = pages.find((x) => x.id == router.query.id);
  } catch (e) {
    // console.log(e);
  }
  // console.log("blo+++", blogs?.recentPosts);
  // let date = moment(pages?.createdAt).format("DD MMM YYYY");
  // const [clean, SetClean] = useState("");
  // SetClean(DOMPurify.sanitize(pages?.content));
  // let testclean = DOMPurify.sanitize(pages?.content);

  let clean = DOMPurify.sanitize(pages?.content);

  return (
    <Wrapper>
      <SEO pageTitle={pages?.title || "pages"} />
      <Header />
      <main id="main-content">
        <Breadcrumb
          pageTitle={pages?.title || "pages"}
          currentPage={pages?.title || "pages"}
        />
        <div className="rn-blog-area rn-blog-details-default rn-section-gapTop">
          <div className="container">
            <div className="row g-6">
              <div className="col-xl-8 col-lg-8">
                {loader && theme ? (
                  <div className="blog-content-top">
                    <Skeleton
                      width={540}
                      height={40}
                      count={1}
                      // wrapper={InlineWrapperWithMargin}
                      inline
                      border={"1px"}
                      display={"flex"}
                      lineHeight={2}
                      style={{ borderRadius: "10px" }}
                      // padding={"1rem"}
                      // baseColor={"red"}
                      // highlightColor={"yellow"}
                      baseColor={
                        theme && theme === "dark" ? "#303030" : "#dbdbdb"
                      }
                      highlightColor={
                        theme && theme === "dark" ? "#404040" : "#bfbfbf"
                      }
                    />{" "}
                  </div>
                ) : (
                  <div className="blog-content-top">
                    <h2 className="title">{pages?.name}</h2>
                    {/* <span className="date">{date}</span> */}
                  </div>
                )}
                {loader && theme ? (
                  <div className="row">
                    <div className="col-sm-6">
                      <Skeleton
                        width={1040}
                        height={40}
                        style={{ marginTop: "10px", borderRadius: "10px" }}
                        count={5}
                        // wrapper={InlineWrapperWithMargin}
                        inline
                        border={"1px"}
                        display={"flex"}
                        lineHeight={2}
                        // padding={"1rem"}
                        // baseColor={"red"}
                        // highlightColor={"yellow"}
                        baseColor={
                          theme && theme === "dark" ? "#303030" : "#dbdbdb"
                        }
                        highlightColor={
                          theme && theme === "dark" ? "#404040" : "#bfbfbf"
                        }
                      />{" "}
                    </div>{" "}
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: clean }} />
                )}
              </div>{" "}
            </div>{" "}
          </div>
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
};
// export async function getStaticPaths() {
//   const posts = getAllPosts(["slug"]);

//   // map through to return post paths
//   const paths = posts.map((post) => ({
//     params: {
//       slug: post.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const post = getPostBySlug(slug, [
//     "content",
//     "title",
//     "date",
//     "slug",
//     "image",
//     "category",
//   ]);
//   const posts = getAllPosts([
//     "category",
//     "slug",
//     "title",
//     "tags",
//     "image",
//     "timeToRead",
//   ]);
//   const categories = posts.map((blog) => ({ ...blog.category }));
//   const tags = posts.map((blog) => [...blog.tags]);
//   const recentPosts = posts.slice(0, 4);
//   const relatedPosts = posts
//     .filter((blog) => blog.category.slug === post.category.slug)
//     .slice(0, 3);

//   return {
//     props: {
//       post,
//       slug,
//       categories,
//       recentPosts,
//       tags,
//       relatedPosts,
//       className: "template-color-1",
//     },
//   };
// }

ViewPages.propTypes = {
  post: PropTypes.shape({}),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  recentPosts: PropTypes.arrayOf(PropTypes.shape({})),
  tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  relatedPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = (state) => {
  return {
    // getName: state.main.getCurrentUser,
    getUser: state.main.getCurrentUser,
    loader: state.main.loader,
    getStore: state.main.getCurrentStoreData,
    getPage: state.main.getPages.pages,
  };
};
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}
export default connect(mapStateToProps)(ViewPages);
