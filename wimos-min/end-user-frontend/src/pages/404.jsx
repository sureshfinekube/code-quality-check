import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Button from "@ui/button";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { updateLoader } from "../redux/actions/main";
import { useEffect, useState } from "react";
import { getCurrentStore, getCurrentUser } from "../redux/actions/main";
export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const ErrorPage = ({ getStore, getUser }) => {
  console.log("getStore +++++++++++741", getStore);
  // console.log("getUser", getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentStore());
    dispatch(getCurrentUser());
  }, []);
  dispatch(updateLoader(false));

  return (
    <Wrapper>
      {/* <SEO pageTitle="404" />
    <Header /> */}
      <div
        className="rn-not-found-area rn-section-gapTop"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="rn-not-found-wrapper">
                <h2 className="large-title">404</h2>
                <h3 className="title">Page not found!</h3>
                <p>The page you are looking for is not available.</p>

                {getStore && (
                  <>
                    {getUser?.metamaskId !== getStore?.metamaskId &&
                    getStore?.type === "single_store" ? (
                      <Button
                        style={{ color: "white" }}
                        path={`https://${getStore?.domain}`}
                      >
                        Go back to home
                      </Button>
                    ) : (
                      <Button
                        style={{ color: "white" }}
                        path={`https://${getStore?.domain}`}
                      >
                        Try again
                      </Button>
                    )}
                  </>
                )}

                {/* path="https://ahp.45a.myftpupload.com/about-us/features/" */}

                {/* <a href="https://wimos.io">Go Back To wimos.io </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    getStore: state.main.getCurrentStoreData,
    getUser: state.main.getCurrentUser,
  };
};

export default connect(mapStateToProps)(ErrorPage);
