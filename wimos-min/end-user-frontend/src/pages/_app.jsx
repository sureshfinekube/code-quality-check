import { useEffect } from "react";
import { wrapper } from "../redux/store";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { MoralisProvider } from "react-moralis";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/datepicker.css";
import "../assets/scss/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";

const moralisAppId = "wimos@2022";
// const moralisServerURL = "http://localhost:1337/server";
// const moralisAppId = "cUj94abZIFcKzCUQTDlmIyy0J29he658C8YCiTXc";
// const moralisServerURL = "https://mjkjr29zklse.usemoralis.com:2053/server";
let moralisServerURL = "";
if (process.env.NEXT_PUBLIC_ENV === "DEV") {
  moralisServerURL = "https://devmoralis.wimos.io/server";
} else {
  moralisServerURL = "https://moralis.wimos.io/server";
}

// import 'bootstrap/dist/css/bootstrap.min.css'
// if (typeof window !== "undefined") {
//   // Perform localStorage action
//   const item = localStorage.getItem("key");
// }

const APP_NAME = "My Awesome App";
const APP_LOGO_URL = "https://example.com/logo.png";
const DEFAULT_ETH_JSONRPC_URL = `https://${process.env.NODE_USERNAME}:${process.env.NODE_PASSWORD}@mainnet.ethereum.coinbasecloud.net`;
const DEFAULT_CHAIN_ID = 1137;

// Initialize Coinbase Wallet SDK
// export const coinbaseWallet = new CoinbaseWalletSDK({
//   appName: APP_NAME,
//   appLogoUrl: APP_LOGO_URL,
//   darkMode: false,
// });
// let val = localStorage.setItem("wallet", coinbaseWallet);

// Initialize a Web3 Provider object
// export const ethereum = coinbaseWallet.makeWeb3Provider(
//   DEFAULT_ETH_JSONRPC_URL,
//   DEFAULT_CHAIN_ID
// );

// Initialize a Web3 object
// export const web3 = new Web3(ethereum);

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    sal({ threshold: 0.1, once: true });
  }, [router.asPath]);

  useEffect(() => {
    sal();
  }, []);
  useEffect(() => {
    document.body.className = `${pageProps.className}`;
  });

  // replace console.* for disable log on production
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    // console.error = () => {}
    console.debug = () => {};
  }

  // coinbase start
  const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  });

  // const APP_NAME = "My Awesome App";
  // const APP_LOGO_URL = "https://example.com/logo.png";
  // const DEFAULT_ETH_JSONRPC_URL = `https://${process.env.NODE_USERNAME}:${process.env.NODE_PASSWORD}@mainnet.ethereum.coinbasecloud.net`;
  // const DEFAULT_CHAIN_ID = 1;

  // // Initialize Coinbase Wallet SDK
  // const coinbaseWallet = new CoinbaseWalletSDK({
  //   appName: APP_NAME,
  //   appLogoUrl: APP_LOGO_URL,
  //   darkMode: false,
  // });

  // // Initialize a Web3 Provider object
  // const ethereum = coinbaseWallet.makeWeb3Provider(
  //   DEFAULT_ETH_JSONRPC_URL,
  //   DEFAULT_CHAIN_ID
  // );

  // // Initialize a Web3 object
  // const web3 = new Web3(ethereum);
  // coinbase end
  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };

  // useEffect(() => {
  //   const provider = window.localStorage.getItem("provider");
  //   if (provider) activate(connectors[provider]);
  // }, []);
  // const root = ReactDOM.createRoot(document.getElementById("root"));
  return (
    <StrictMode>
      {/* <ChakraProvider> */}
      
      <Web3ReactProvider getLibrary={getLibrary}>
        <MoralisProvider appId={moralisAppId} serverUrl={moralisServerURL}>
          <WagmiConfig client={client}>
            <ThemeProvider defaultTheme="dark">
              <Component {...pageProps} />
            </ThemeProvider>
          </WagmiConfig>
        </MoralisProvider>
      </Web3ReactProvider>
      {/* </ChakraProvider> */}
    </StrictMode>
    // <WagmiConfig client={client}>
    //   <ThemeProvider defaultTheme="dark">
    //     <Component {...pageProps} />
    //   </ThemeProvider>
    // </WagmiConfig>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({
    className: PropTypes.string,
  }),
};

export default wrapper.withRedux(MyApp);
