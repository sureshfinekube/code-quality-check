import PropTypes from "prop-types";
import Logo from "@components/logo";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme, useSelector } from "next-themes";

const LogoWidget = ({ data, myStore, message, loader }) => {
  const profileLogo = myStore?.storeLogo;
  const profileName = myStore?.name;
  const storeId = myStore?.storeId;
  // const loader = useSelector((state) => state.main.loader);
  const { theme } = useTheme();

  // console.log("message", message);
  return (
    <>
      {loader && theme ? (
        <Skeleton
          width={240}
          height={30}
          count={2}
          // wrapper={InlineWrapperWithMargin}
          inline
          border={"1px"}
          display={"flex"}
          lineHeight={2}
          // padding={"1rem"}
          // baseColor={"red"}
          // highlightColor={"yellow"}
          baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
          highlightColor={theme && theme === "dark" ? "#404040" : "#bfbfbf"}
        />
      ) : (
        <>
          <div className="footer-left">
            <Logo logo={profileLogo} logoName={profileName} storeId={storeId} />
            {message && message !== "undefined" && message !== "" && message ? (
              <p className="rn-footer-describe">{message}</p>
            ) : (
              <p className="rn-footer-describe">Your footer content here</p>
            )}
          </div>
        </>
      )}
    </>
  );
};
LogoWidget.propTypes = {
  data: PropTypes.shape({
    logo: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
    text: PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  return {
    myStore: state.main.getCurrentStoreData,
    loader: state.main.loader,
  };
};

export default connect(mapStateToProps)(LogoWidget);
