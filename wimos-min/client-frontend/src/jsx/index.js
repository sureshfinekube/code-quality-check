import React, { useContext, useEffect, useState } from "react";

/// React router dom
import { Switch, Route, useHistory } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// redux
import { connect, useDispatch } from "react-redux";
///Store
import StoreSelect from "./pages/StoreSelect";
/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Project from "./components/Dashboard/Project";
import Contacts from "./components/Dashboard/Contacts";
import Kanban from "./components/Dashboard/Kanban";
import Task from "./components/Dashboard/Task";
import DashboardCalendar from "./components/Dashboard/DashboardCalendar";
import Messages from "./components/Dashboard/Messages";
import BillingHistory from "./components/Dashboard/Billinghistory/history";
import BillingSettings from "./components/Dashboard/Billinghistory/BillingSettings";
import PackageManagement from "./components/Dashboard/package/PackageManagement";
import BlogManagement from "./components/Blog/BlogManagement";
import Seo from "./components/Dashboard/Users-Seo/Seo";
import ChangeAddress from "./components/Dashboard/Billinghistory/ChangeAdrees";
import BlogTable from "./components/Blog/BlogTable";
import BlogEdit from "./components/Blog/BlogEdit";
import BlogView from "./components/Blog/Blog-View";
import PageCreate from "./components/Appearance/PageCreate";
import PageEdit from "./components/Appearance/PageEdit";
import BlogCategory from "./components/Blog/BlogCategory";

/// Customer

// import CustomerData from "./components/Customers/customerdata";
import Customers from "./components/Customers/Customers";
import ViewCustomer from "./components/Customers/ViewCustomer";

/// package updation stripe
import StripeUpdation from "./components/Dashboard/package/StripeUpdation";

/// Create NFT

import CreateNFT from "./components/Nft/createnft";
import NFT from "./components/Nft/nft";
import ViewNFT from "./components/Nft/ViewNFT";
import Editnft from "./components/Nft/Editnft";

//Settings
import GeneralSettings from "./components/Settings/GeneralSettings";
import Domains from "./components/Settings/domains";
/// Pages

import pages from "./components/Appearance/pages";
import AboutUs from "./components/Appearance/about";
import Terms from "./components/Appearance/terms";
import PrivacyPolicy from "./components/Appearance/privacypolicy";
import FAQs from "./components/Appearance/faqs";
import Themes from "./components/Appearance/Themes";
import ThemeCustomize from "./components/Appearance/ThemeCustomize";
import SectionCustomize from "./components/Appearance/StepAreaCreate";
import SectionEdit from "./components/Appearance/SectionEdit";
import ProfileDummy from "./components/Appearance/ProfileDummy";

///Demo
import Theme1 from "./components/Dashboard/Demo/Theme1";
import Theme2 from "./components/Dashboard/Demo/Theme2";
import Theme3 from "./components/Dashboard/Demo/Theme3";
import Theme4 from "./components/Dashboard/Demo/Theme4";
import Theme5 from "./components/Dashboard/Demo/Theme5";
import Theme6 from "./components/Dashboard/Demo/Theme6";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import EcomCustomers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
import Todo from "./pages/Todo";
// import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
// import WizardForm from "./components/Forms/ReduxWizard/Index";

/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pages
// import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";

import CategoryList from "./components/Categories/CategoryList";
import ViewCollection from "./components/Customers/ViewCollection";
import ContractPage from "./components/Contracts";
import StepsArea from "./components/Appearance/StepsArea";
import AddStore from "./pages/AddStore";
import { StoreCreationStatus } from "../store/actions/AuthActions";
import { ReportNFT } from "./components/Nft/report";
import SocialMedia from "./components/socialMedia/socialMedia";
import ContactUs from "./components/ContactUs/ContactUs";

const Markup = (props) => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    //{ url: "addnewstore", component: AddStore },
    // { url: "dashboard-dark", component: DashboardDark },
    // { url: "project", component: Project },
    // { url: "contacts", component: Contacts },
    // { url: "kanban", component: Kanban },
    // { url: "task", component: Task },
    // { url: "calendar", component: DashboardCalendar },
    // { url: "messages", component: Messages },

    // Customer
    // { url: "customers", component: CustomerData },
    { url: "customers", component: Customers },
    { url: "view-customer-:id", component: ViewCustomer },
    { url: "view-collection-:id", component: ViewCollection },

    // NFT
    { url: "create-NFT", component: CreateNFT },
    { url: "nft-:id", component: NFT },
    { url: "view-nft-:id", component: ViewNFT },
    { url: "edit-nft-:id", component: Editnft },
    { url: "report-nft:id", component: ReportNFT },

    //Settings
    { url: "general-settings", component: GeneralSettings },
    { url: "domain-settings", component: Domains },

    /// package updation stripe
    { url: "stripe-updation", component: StripeUpdation },

    //Pages
    { url: "pages", component: pages },
    { url: "about-us", component: AboutUs },
    { url: "PageCreate", component: PageCreate },
    { url: "pages-edit:id", component: PageEdit },
    { url: "terms-of-service", component: Terms },
    { url: "privacy-policy", component: PrivacyPolicy },
    { url: "faqs", component: FAQs },
    { url: "themes", component: Themes },
    { url: "customize-theme", component: ThemeCustomize },
    { url: "customize-section", component: StepsArea },
    { url: "addnew-section", component: SectionCustomize },
    { url: "section-edit:id", component: SectionEdit },
    { url: "profile-section", component: ProfileDummy },
    //Category

    { url: "category-list", component: CategoryList },
    { url: "billing-history", component: BillingHistory },
    { url: "billing-settings", component: BillingSettings },
    { url: "change-packages", component: PackageManagement },
    { url: "create-blog", component: BlogManagement },
    { url: "users-seo", component: Seo },
    { url: "change-address", component: ChangeAddress },
    { url: "blogs", component: BlogTable },
    { url: "blog-edit:id", component: BlogEdit },
    { url: "blog-view:id", component: BlogView },
    { url: "blog-category", component: BlogCategory },

    { url: "Social-media", component: SocialMedia },
    { url: "contact-us", component: ContactUs },

    ///Demo
    // { url: "theme1", component: Theme1 },
    // { url: "theme2", component: Theme2 },
    // { url: "theme3", component: Theme3 },
    // { url: "theme4", component: Theme4 },
    // { url: "theme5", component: Theme5 },
    // { url: "theme6", component: Theme6 },

    /// Apps
    { url: "app-profile", component: AppProfile },
    // { url: "email-compose", component: Compose },
    // { url: "email-inbox", component: Inbox },
    // { url: "email-read", component: Read },
    // { url: "app-calender", component: Calendar },
    // { url: "post-details", component: PostDetails },

    /// Chart
    // { url: "chart-sparkline", component: SparklineChart },
    // { url: "chart-chartjs", component: ChartJs },
    // { url: "chart-chartist", component: Chartist },
    // { url: "chart-apexchart", component: ApexChart },
    // { url: "chart-rechart", component: RechartJs },

    /// Bootstrap
    // { url: "ui-alert", component: UiAlert },
    // { url: "ui-badge", component: UiBadge },
    // { url: "ui-button", component: UiButton },
    // { url: "ui-modal", component: UiModal },
    // { url: "ui-button-group", component: UiButtonGroup },
    // { url: "ui-accordion", component: UiAccordion },
    // { url: "ui-list-group", component: UiListGroup },
    // { url: "ui-media-object", component: UiMediaObject },
    // { url: "ui-card", component: UiCards },
    // { url: "ui-carousel", component: UiCarousel },
    // { url: "ui-dropdown", component: UiDropDown },
    // { url: "ui-popover", component: UiPopOver },
    // { url: "ui-progressbar", component: UiProgressBar },
    // { url: "ui-tab", component: UiTab },
    // { url: "ui-pagination", component: UiPagination },
    // { url: "ui-typography", component: UiTypography },
    // { url: "ui-grid", component: UiGrid },

    /// Plugin
    // { url: "uc-select2", component: Select2 },
    // { url: "uc-nestable", component: Nestable },
    // { url: "uc-noui-slider", component: MainNouiSlider },
    // { url: "uc-sweetalert", component: MainSweetAlert },
    // { url: "uc-toastr", component: Toastr },
    // { url: "map-jqvmap", component: JqvMap },
    // { url: "uc-lightgallery", component: Lightgallery },

    ///Redux
    // { url: "todo", component: Todo },
    // { url: "redux-form", component: ReduxForm },
    // { url: "redux-wizard", component: WizardForm },

    /// Widget
    // { url: "widget-basic", component: Widget },

    /// Shop
    // { url: "ecom-product-grid", component: ProductGrid },
    // { url: "ecom-product-list", component: ProductList },
    // { url: "ecom-product-detail", component: ProductDetail },
    // { url: "ecom-product-order", component: ProductOrder },
    // { url: "ecom-checkout", component: Checkout },
    // { url: "ecom-invoice", component: Invoice },
    // { url: "ecom-product-detail", component: ProductDetail },
    // { url: "ecom-customers", component: EcomCustomers },

    /// Form
    // { url: "form-element", component: Element },
    // { url: "form-wizard", component: Wizard },
    // { url: "form-editor-summernote", component: SummerNote },
    // { url: "form-pickers", component: Pickers },
    // { url: "form-validation-jquery", component: jQueryValidation },

    /// table
    // { url: "table-filtering", component: FilteringTable },
    // { url: "table-sorting", component: SortingTable },
    // { url: "table-datatable-basic", component: DataTable },
    // { url: "table-bootstrap-basic", component: BootstrapTable },

    /// pages
    // { url: "page-register", component: Registration },
    { url: "page-lock-screen", component: LockScreen },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "contract-page", component: ContractPage },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadingToggleAction(true));
  //   dispatch(GetStoreAction("627b90e41f5ca6139a835295"));
  // });

  const dispatch = useDispatch();
  let path = window.location.pathname;

  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "POP") {
        //  console.log("get");
        dispatch(StoreCreationStatus(false));
      }
    });
  }, [history]);
  useEffect(() => {
    if (path === "dashboard") {
      dispatch(StoreCreationStatus(false));
    }
  }, [path]);
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!props.storeselected ? (
          <>
            {!props.createstorestatus ? (
              <StoreSelect />
            ) : (
              <div className="vh-100"></div>
            )}
            <Route path="/addnewstore" component={AddStore} />
          </>
        ) : (
          <>
            {!pagePath && <Nav />}

            <div className={`${!pagePath ? "content-body" : ""}`}>
              <div
                className={`${!pagePath ? "container-fluid" : ""}`}
                style={{ minHeight: window.screen.height - 60 }}
              >
                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
            {!pagePath && <Footer />}
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.auth._id,
    storeselected: state.auth.storeSelected,
    createstorestatus: state.auth.createstorestatus,
  };
};

export default connect(mapStateToProps)(Markup);
