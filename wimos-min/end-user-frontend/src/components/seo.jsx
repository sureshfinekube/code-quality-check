import Head from "next/head";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const SEO = ({ pageTitle, store }) => {
  const seo = store.seo;
  const id = store.storeId;
  // console.log("seo", store.seo);
  const dispatch = useDispatch();

  return (
    <Head>
      <title>
        {" "}
        {pageTitle} || {seo?.meta_title ? seo?.meta_title : store.name}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={seo?.meta_description} />
      <meta name="robots" content={store?.seo?.robotsText} />
      <meta name="keywords" content={seo?.meta_tag.join(",")} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        property="og:image"
        content={store?.seo?.previewImage}
        // key="ogimage"
      />
      <meta property="og:image:type" content={store?.seo?.previewImage} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <link
        rel="icon"
        href={
          `https://` +
          process.env.NEXT_PUBLIC_CLIENT_AWS_URL +
          `/store/${id}/${store?.favIcon}`
        }
      />
      {store.gaTrackingId && (
        <script
          async
          src={
            `https://www.googletagmanager.com/gtag/js?id=` + store?.gaTrackingId
          }
        />
      )}
      {store.gaTrackingId && (
        <script
          dangerouslySetInnerHTML={{
            __html:
              `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '` +
              store?.gaTrackingId +
              `');
        `,
          }}
        />
      )}
    </Head>
  );
};

SEO.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    store: state.main.getCurrentStoreData,
  };
};

export default connect(mapStateToProps)(SEO);
