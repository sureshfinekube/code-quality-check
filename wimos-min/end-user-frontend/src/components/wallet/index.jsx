import PropTypes from "prop-types";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Image from "next/image";
import { useMoralis } from "react-moralis";

const Wallet = ({ className, title, description, path, icon, color }) => {
  const { user, isAuthenticated, authenticate } = useMoralis();

  const handleSubmit = async () => {
    // console.log('in submit')
    if (typeof window.ethereum !== "undefined") {
      authenticate({
        signingMessage: "Wimos Authentication",
      });
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  return (
    <div
      className={clsx("wallet-wrapper", className)}
      style={{ ...(title == "MetaMask" && { cursor: "pointer" }) }}
      onClick={title == "MetaMask" && handleSubmit}
    >
      <div className="inner" style={{ textAlign: "center" }}>
        <div className="icon">
          {/* <i className={clsx("feather", icon, `color-${color}`)} /> */}
          <Image
            src={`/${icon}`}
            alt="Images"
            layout="fixed"
            width={50}
            height={50}
          />
        </div>
        <div className="content">
          <h4 className="title">{title}</h4>
          {/* <p className="description">{description}</p> */}
        </div>
      </div>
      <Anchor className="over-link visually-hidden" path={path}>
        {title} link
      </Anchor>
    </div>
  );
};

Wallet.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Wallet;
