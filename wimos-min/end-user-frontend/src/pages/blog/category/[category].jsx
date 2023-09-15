import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog/layout-02";
import { connect } from "react-redux";
import { useRouter } from "next/router";

// import { getPostsByCategory, getAllPosts } from "../../../lib/api";
export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const Blog = ({ posts, getBlogCategories, getBlog }) => {
  const router = useRouter();
  console.log("getBlogCategories---", getBlogCategories);
  console.log("router.query.id", router.query.category);
  let blogs = getBlog?.filter(({ categoryId }) =>
    categoryId.includes(router.query.category)
  );
  console.log("blogs ", blogs);

  let blog = getBlogCategories?.filter(({ id }) =>
    id.includes(router.query.category)
  );
  console.log("blooooooooooo ", blog);

  blog = blog?.find((x) => x.id == router.query.category);

  console.log("blooooooooooo 11111111111", blog);
  // console.log("title 11111111111", title);

  // let blogs = getBlogCategories?.find((x) => x.id == router.query.id);
  // console.log("blooooooooooo 22222222", blogs);
  return (
    <Wrapper>
      <SEO pageTitle="Blog" />
      <Header />
      <main id="main-content">
        <Breadcrumb pageTitle={blog?.title} currentPage="Our Blog" />
        <BlogArea data={{ blogs }} />
      </main>
      <Footer />
    </Wrapper>
  );
};
// export async function getStaticPaths() {
//   const posts = getAllPosts(["category"]);
//   return {
//     paths: posts.map(({ category }) => ({
//       params: {
//         category: category.slug,
//       },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const posts = getPostsByCategory(params.category, [
//     "title",
//     "date",
//     "slug",
//     "image",
//     "category",
//     "timeToRead",
//   ]);

//   return {
//     props: {
//       posts,
//       title: params.category,
//       className: "template-color-1",
//     },
//   };
// }

Blog.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

const mapStateToProps = (state) => {
  return {
    getBlogCategories: state.main.getBlogCategory.blogCategories,
    getBlog: state.main.getBlogs.blogs,
  };
};
export default connect(mapStateToProps)(Blog);
