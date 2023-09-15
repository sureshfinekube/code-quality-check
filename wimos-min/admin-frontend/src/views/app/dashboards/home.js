import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IconCard from "components/cards/IconCard";
import GlideComponent from "components/carousel/GlideComponent";
import IconCardsCarousel from "containers/dashboards/IconCardsCarousel";
import QuickPost from "containers/dashboards/QuickPost";
import BestSellers from "containers/dashboards/BestSellers";
import Cakes from "containers/dashboards/Cakes";
import GradientWithRadialProgressCard from "components/cards/GradientWithRadialProgressCard";
import WebsiteVisitsChartCard from "containers/dashboards/WebsiteVisitsChartCard";
import ConversionRatesChartCard from "containers/dashboards/ConversionRatesChartCard";
import NewComments from "containers/dashboards/NewComments";
import { GetInsight } from "utils/axios/requestHandler";
import { connect } from "react-redux";
import {
  getPackageAction,
  getClientAction,
  getAdminInsightAction,
} from "redux/actions";

const DashboardContent = ({ match, insight, dashboard }) => {
  // console.log("dashboard", dashboard);
  // const [insight, setInsight] = useState([]);
  const data = [
    // {
    //   title: "dashboards.today",
    //   icon: "iconsminds-male",
    //   value: insight.totalClients,
    // },
    {
      title: "dashboard.clientcount",
      icon: "iconsminds-male-female",
      value: insight.totalClients ? insight.totalClients : 0 ,
    },

    {
      title: "dashboards.activeclients",
      icon: "iconsminds-conference",
      value: insight.totalActiveClients ? insight.totalActiveClients : 0 ,
    },
    {
      title: "dashboards.totalrevenue",
      icon: "iconsminds-financial",
      value: typeof(insight.totalRevenue) === "string" || typeof(insight.totalRevenue) === "number" ? insight.totalRevenue : 0 ,
    },
    // {
    //   title: "Total User",
    //   icon: "iconsminds-coins",
    //   value: dashboard.usersCount,
    // },
    // {
    //   title: "Total NFT",
    //   icon: "iconsminds-coins",
    //   value: dashboard.nftsCount,
    // },
    // {
    //   title: "Total Collections",
    //   icon: "iconsminds-coins",
    //   value: dashboard.collectionsCount,
    // },

    // {
    //   title: "dashboards.totalmetamaskpayment",
    //   icon: "iconsminds-wallet",
    //   value: "3500 ETH",
    // },
    {
      title: "dashboards.toatlsubscription",
      icon: "iconsminds-checkout-bag",
      value: insight.totalSubscriptions ? insight.totalSubscriptions : 0 ,
    },
    // {
    //   title: "dashboards.toatlcontracts",
    //   icon: "iconsminds-notepad",
    //   value: "10",
    // },
    {
      title: "dashboards.toatlstores",
      icon: "iconsminds-shop",
      value: insight.totalStores ? insight.totalStores : 0 ,
    },
  ];

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.home" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="12">
          <div className="icon-cards-row">
            {/* <GlideComponent
              settings={{
                gap: 3,
                perView: 3,
                type: "carousel",
                breakpoints: {
                  320: { perView: 1 },
                  576: { perView: 2 },
                  1600: { perView: 3 },
                  // 1800: { perView: 4 },
                },
                hideNav: true,
              }}
            >
              {data.map((item, index) => (
                <div key={`icon_card_${index}`}>
                  <IconCard {...item} className="mb-4" />
                </div>
              ))}
            </GlideComponent> */}
            <Row className="icon-cards-row mb-2">
              {data.map((item, index) => (
                <Colxx xxs="6" sm="4" md="3" lg="4" key={`icon_card_${index}`}>
                  <IconCard {...item} className="mb-4" />
                </Colxx>
              ))}
            </Row>
          </div>
        </Colxx>
      </Row>
      {/* <Row>
        <Colxx lg="6" md="6" className="mb-6">
          <GradientWithRadialProgressCard
            icon="iconsminds-male"
            title={`10 Users`}
            detail={messages["dashboards.on-approval-process"]}
            percent={(10 * 100) / 100}
            progressText="10/100"
          />
        </Colxx>
        <Colxx lg="6" md="6" className="mb-6">
          <GradientWithRadialProgressCard
            icon="iconsminds-conference"
            title={`50 Total Users`}
            detail={messages["dashboards.pending-for-publish"]}
            percent={(50 * 100) / 100}
            progressText="50/100"
          />
        </Colxx>

      </Row> */}
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  const {
    onadminInsight,
    adminInsightErr,
    adminInsightSuccess,
    insight,
    onadminDashbaord,
    adminDashbaordErr,
    adminDashbaordSuccess,
    dashboard,
  } = adminData;
  return {
    onadminInsight,
    adminInsightErr,
    adminInsightSuccess,
    insight,
    onadminDashbaord,
    adminDashbaordErr,
    adminDashbaordSuccess,
    dashboard,
  };
};
export default connect(mapStateToProps)(DashboardContent);
