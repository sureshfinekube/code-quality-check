import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsAndConditionsArea from "@containers/terms-condition";
import ConnectArea from "@containers/connect";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const WalletConnect = () => (
  <Wrapper>
    <SEO pageTitle="Terms & Condition" />
    <Header />
    <main id="main-content">
      {/* <Breadcrumb
                pageTitle="Terms & Condition"
                currentPage="Terms & Condition"
            />
            <TermsAndConditionsArea /> */}
      <ConnectArea />
    </main>
    <Footer />
  </Wrapper>
);

export default WalletConnect;
