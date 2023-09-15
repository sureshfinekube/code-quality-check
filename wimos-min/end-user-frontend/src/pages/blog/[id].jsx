import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import { connect } from "react-redux";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import BlogDetailsArea from "@containers/blog-details";
// import CommentsArea from "@containers/comments-area";
// import CommentForm from "@components/comment-form";
import RelatedPostsArea from "@containers/related-posts";
import BlogSidebar from "@containers/blog-sidebar";
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
  getBlogsData,
} from "src/redux/actions/main";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}
const BlogDetails = ({
  post,
  categories,
  recentPosts,
  tags,
  relatedPosts,
  getBlog,
  getStore,
  getBlogCategories,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

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
      dispatch(getBlogsData(router.query.id));
    }
  }, [getStore]);
  let blogs = "";
  try {
    console.log("id", router.query.id);
    blogs = getBlog.filter(({ id }) => id.includes(router.query.id));
    const blog = blogs[0];
    blogs = blogs.find((x) => x.id == router.query.id);
  } catch (e) {
    // console.log(e);
  }
  console.log("categories+++", getBlogCategories);
  console.log("blogs+++", blogs);

  return (
    <Wrapper>
      <SEO pageTitle="Blog Details" />
      <Header />
      <main id="main-content">
        <Breadcrumb pageTitle="Blog Details" currentPage="Blog Details" />
        <div className="rn-blog-area rn-blog-details-default rn-section-gapTop">
          <div className="container">
            <div className="row g-6">
              <div className="col-xl-8 col-lg-8">
                <BlogDetailsArea post={blogs} />
                {/* <CommentsArea /> */}
                {/* <CommentForm /> */}
              </div>
              <div className="col-xl-4 col-lg-4 mt_md--40 mt_sm--40">
                <BlogSidebar
                  categories={getBlogCategories}
                  recentPosts={blogs?.recentPosts}
                  tags={blogs?.tags}
                />
              </div>
            </div>
            <RelatedPostsArea
              relatedPosts={blogs?.relatedPosts}
              storeId={blogs?.storeId}
            />
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

BlogDetails.propTypes = {
  post: PropTypes.shape({}),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  recentPosts: PropTypes.arrayOf(PropTypes.shape({})),
  tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  relatedPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = (state) => {
  return {
    // getName: state.main.getCurrentUser,
    userNftData: state.main.getUserNFT,
    nftData: state.main.getAllStoreNft,
    getUser: state.main.getCurrentUser,
    loader: state.main.loader,
    getStore: state.main.getCurrentStoreData,
    getBlog: state.main.getBlogs.blogs,
    getBlogCategories: state.main.getBlogCategory.blogCategories,
  };
};
export default connect(mapStateToProps)(BlogDetails);
