const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");
const moduleExports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/assets/scss")],
  },
  images: {
    domains: [
      "ipfs.moralis.io",
      "nft-user.s3.ap-south-1.amazonaws.com",
      // "nft-client.s3.us-east-2.amazonaws.com",
      "wimos-client-1.s3.us-west-2.amazonaws.com",
      "wimos-user.s3.us-west-2.amazonaws.com",
      "gateway.moralisipfs.com",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // eslint-disable-next-line no-param-reassign
    config.ignoreWarnings = [
      {
        message:
          /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
      },
    ];
    return config;
  },
  sentry: {
    hideSourceMaps: true,
    // See the 'Configure Source Maps' and 'Configure Legacy Browser Support'
    // sections below for information on the following options:
    //   - disableServerWebpackPlugin
    //   - disableClientWebpackPlugin
    //   - autoInstrumentServerFunctions
    //   - hideSourceMaps
    //   - widenClientFileUpload
    //   - transpileClientSDK
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
