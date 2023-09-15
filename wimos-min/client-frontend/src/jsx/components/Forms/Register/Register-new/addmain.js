import React, { useState, useEffect } from "react";
import VerifyOtp from "./VerifyOtp";
import UserName from "./UserName";
import CreateStore from "./CreateStore";
import MetamaskCon from "./MetamaskCon";
import PackageSelect from "./PackageSelect";
import StoreType from "./StoreType";
import WalletConnection from "./WallletConnection";
import UserDetails from "./UserDetails";
import CreateContract from "./CreateContract";
import ContractERC721 from "./ContractERC721";
import Loader from "./Loader";
// import Subs from "../Subscription";
import { connect } from "react-redux";
import MarketplaceTemplates from "./MarketplaceTemplates";

function AddForm(props) {
  // const componentDidMount = () => {
  //   if (!this.props.AuthData) {
  //     this.setStep({
  //       step: 7,
  //     });
  //   }
  // };

  // console.log("props", props);

  // const handleChange = (e, value) => {
  //   // console.log("arrived here: ", e);
  //   this.setState({ [value]: e });
  // };
  // const errorMessage = (value) => {
  //   // console.log("arrived here: ", e);
  //   this.setState({ [value]: true });
  // };
  // const sucessMessage = (value) => {
  //   // console.log("arrived here: ", e);
  //   this.setState({ [value]: false });
  // };

  // const [token, setToken] = useState()

  // useEffect(() => {
  //   setToken(localStorage.getItem('c_wimos'))
  // }, [])

  return (
    <div>
      {(() => {
        switch (props.step) {
          case 1:
            return (
              <StoreType
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                setContractType={props.setContractType}
                contractType={props.contractType}
                isnewstore={props.isnewstore}
                // setDomainName={props.setDomainName}
                // domainName={props.domainName}
                // errMsg={props.errMsg}
                // setOwndomainName={props.setOwndomainName}
                // owndomainName={props.owndomainName}
              />
            );

          case 2:
            return (
              <CreateStore
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                setStoreName={props.setStoreName}
                storeName={props.storeName}
                setDomainName={props.setDomainName}
                domainName={props.domainName}
                errMsg={props.errMsg}
                setOwndomainName={props.setOwndomainName}
                owndomainName={props.owndomainName}
                isnewstore={props.isnewstore}
                setStoreVal={props.setStoreVal}
                storeVal={props.storeVal}
                setDomainVal={props.setDomainVal}
                domainVal={props.domainVal}
              />
            );
          // case 5:
          //   return (
          //     <MetamaskCon
          //       nextStep={nextStep}
          //       prevStep={prevStep}
          // handleChange={handleChange}
          // values={values}
          //   />
          // );
          // case 6:
          //   return (
          //     <PageFive
          //       nextStep={this.nextStep}
          //       prevStep={this.prevStep}
          //       handleChange={this.handleChange}
          //       values={values}
          //     />
          //   );
          case 3:
            return props.contractType === "single_store" ? (
              <CreateContract
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                erc721={props.erc721}
                setErc721={props.setErc721}
                erc1155={props.erc1155}
                setErc1155={props.setErc1155}
                erc721Data={props.erc721Data}
                setErc721Data={props.setErc721Data}
                erc115Data={props.erc115Data}
                setErc115Data={props.setErc115Data}
                isnewstore={props.isnewstore}
                contractType={props.contractType}
              />
            ) : (
              // Marketplace Templates
              <MarketplaceTemplates
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                marketplaceTemplate={props.marketplaceTemplate}
                setMarketplaceTemplate={props.setMarketplaceTemplate}
                erc721={props.erc721}
                setErc721={props.setErc721}
                erc1155={props.erc1155}
                setErc1155={props.setErc1155}
                // erc721Data={props.erc721Data}
                // setErc721Data={props.setErc721Data}
                // erc115Data={props.erc115Data}
                // setErc115Data={props.setErc115Data}
              />
            );

          case 4:
            return (
              <ContractERC721
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                erc721={props.erc721}
                setErc721={props.setErc721}
                erc1155={props.erc1155}
                setErc1155={props.setErc1155}
                erc721Data={props.erc721Data}
                setErc721Data={props.setErc721Data}
                setErc1155Data={props.setErc1155Data}
                erc1155Data={props.erc1155Data}
                errMsg={props.errMsg}
                fee={props.feePreview}
                isnewstore={props.isnewstore}
                freemint={props.freemint}
                setFreemint={props.setFreemint}

                // erc115Data={props.erc115Data}
                // setErc115Data={props.setErc115Data}
              />
            );

          case 5:
            return (
              <MetamaskCon
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                history={props.history}
                isnewstore={props.isnewstore}
              />
            );
          case 6:
            return (
              <PackageSelect
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                isnewstore={props.isnewstore}
              />
            );
          case 7:
            return (
              <WalletConnection
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                history={props.history}
                isnewstore={props.isnewstore}
                freemint={props.freemint}
                setFreemint={props.setFreemint}
              />
            );
          case 8:
            return <Loader />;
          default:
            console.log("This is a multi-step form built with React.");
        }
      })()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    AuthData: state.auth,
    // StripePriceId: state.register.packages.packages.stripe_price_id,
  };
};
export default connect(mapStateToProps)(AddForm);
