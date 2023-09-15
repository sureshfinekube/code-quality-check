/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
//import { Dropdown } from "react-bootstrap";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
//import LogoutPage from './Logout';
import { connect } from "react-redux";
/// Image
import user from "../../../images/user.jpg";
import { useLocation } from "react-router-dom";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = (props) => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    // handleheartBlast.addEventListener("click", heartBlast);
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  const location = useLocation();
  const { pathname } = location;
  // console.log("pathname", pathname);
  let path = pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = ["dashboard"],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    email = ["email-compose", "email-inbox", "email-read"],
    shop = [
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-media-object",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",
      "uc-nestable",
      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
    redux = ["redux-form", "redux-wizard", "todo"],
    widget = ["widget-basic"],
    customers = ["customers"],
    nft = ["nft"],
    categories = ["category-list"],
    // domains = ["domains"],
    Appearance = ["pages", "themes", "blogs"],
    Settings = ["general-settings", "doamin-settings"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    billing = ["billing-history", "billing-settings"],
    Packages = ["change-packages"],
    SEO = ["users-seo"],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  // console.log("path", window.location.pathname);
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className=" ai-icon" to="dashboard">
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>

          {/* <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-info-circle"></i>
              <span className="nav-text">Apps</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "app-profile" ? "mm-active" : ""}`}
                  to="/app-profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "post-details" ? "mm-active" : ""}`}
                  to="/post-details"
                >
                  Post Details
                </Link>
              </li>
              <li className={`${email.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  Email
                </Link>
                <ul className={`${email.includes(path) ? "mm-show" : ""}`}>
                  <li>
                    <Link
                      className={`${
                        path === "email-compose" ? "mm-active" : ""
                      }`}
                      to="/email-compose"
                    >
                      Compose
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${path === "email-inbox" ? "mm-active" : ""}`}
                      to="/email-inbox"
                    >
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${path === "email-read" ? "mm-active" : ""}`}
                      to="/email-read"
                    >
                      Read
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className={`${path === "app-calender" ? "mm-active" : ""}`}
                  to="/app-calender"
                >
                  Calendar
                </Link>
              </li>
              <li className={`${shop.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  Shop
                </Link>
                <ul className={`${shop.includes(path) ? "mm-show" : ""}`}>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-product-grid" ? "mm-active" : ""
                      }`}
                      to="/ecom-product-grid"
                    >
                      Product Grid
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-product-list" ? "mm-active" : ""
                      }`}
                      to="/ecom-product-list"
                    >
                      Product List
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-product-detail" ? "mm-active" : ""
                      }`}
                      to="/ecom-product-detail"
                    >
                      Product Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-product-order" ? "mm-active" : ""
                      }`}
                      to="/ecom-product-order"
                    >
                      Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-checkout" ? "mm-active" : ""
                      }`}
                      to="/ecom-checkout"
                    >
                      Checkout
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-invoice" ? "mm-active" : ""
                      }`}
                      to="/ecom-invoice"
                    >
                      Invoice
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "ecom-customers" ? "mm-active" : ""
                      }`}
                      to="/ecom-customers"
                    >
                      Customers
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={`${charts.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-chart-line"></i>
              <span className="nav-text">Charts</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "chart-rechart" ? "mm-active" : ""}`}
                  to="/chart-rechart"
                >
                  RechartJs
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-chartjs" ? "mm-active" : ""}`}
                  to="/chart-chartjs"
                >
                  Chartjs
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-chartist" ? "mm-active" : ""}`}
                  to="/chart-chartist"
                >
                  Chartist
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-sparkline" ? "mm-active" : ""}`}
                  to="/chart-sparkline"
                >
                  Sparkline
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-apexchart" ? "mm-active" : ""}`}
                  to="/chart-apexchart"
                >
                  Apexchart
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fab fa-bootstrap"></i>
              <span className="nav-text">Bootstrap</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "ui-accordion" ? "mm-active" : ""}`}
                  to="/ui-accordion"
                >
                  Accordion
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-alert" ? "mm-active" : ""}`}
                  to="/ui-alert"
                >
                  {" "}
                  Alert
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-badge" ? "mm-active" : ""}`}
                  to="/ui-badge"
                >
                  Badge
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button" ? "mm-active" : ""}`}
                  to="/ui-button"
                >
                  Button
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-modal" ? "mm-active" : ""}`}
                  to="/ui-modal"
                >
                  Modal
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button-group" ? "mm-active" : ""}`}
                  to="/ui-button-group"
                >
                  Button Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-list-group" ? "mm-active" : ""}`}
                  to="/ui-list-group"
                >
                  List Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-card" ? "mm-active" : ""}`}
                  to="/ui-card"
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-carousel" ? "mm-active" : ""}`}
                  to="/ui-carousel"
                >
                  Carousel
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-dropdown" ? "mm-active" : ""}`}
                  to="/ui-dropdown"
                >
                  Dropdown
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-popover" ? "mm-active" : ""}`}
                  to="/ui-popover"
                >
                  Popover
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-progressbar" ? "mm-active" : ""}`}
                  to="/ui-progressbar"
                >
                  Progressbar
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-tab" ? "mm-active" : ""}`}
                  to="/ui-tab"
                >
                  Tab
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-typography" ? "mm-active" : ""}`}
                  to="/ui-typography"
                >
                  Typography
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-pagination" ? "mm-active" : ""}`}
                  to="/ui-pagination"
                >
                  Pagination
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-grid" ? "mm-active" : ""}`}
                  to="/ui-grid"
                >
                  Grid
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-heart"></i>
              <span className="nav-text">Plugins</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "uc-select2" ? "mm-active" : ""}`}
                  to="/uc-select2"
                >
                  Select 2
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-nestable" ? "mm-active" : ""}`}
                  to="/uc-nestable"
                >
                  Nestedable
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-noui-slider" ? "mm-active" : ""}`}
                  to="/uc-noui-slider"
                >
                  Noui Slider
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-sweetalert" ? "mm-active" : ""}`}
                  to="/uc-sweetalert"
                >
                  Sweet Alert
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-toastr" ? "mm-active" : ""}`}
                  to="/uc-toastr"
                >
                  Toastr
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "map-jqvmap" ? "mm-active" : ""}`}
                  to="/map-jqvmap"
                >
                  Jqv Map
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "uc-lightgallery" ? "mm-active" : ""}`}
                  to="/uc-lightgallery"
                >
                  Light Gallery
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${redux.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Redux</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "todo" ? "mm-active" : ""}`}
                  to="/todo"
                >
                  Todo
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "redux-form" ? "mm-active" : ""}`}
                  to="/redux-form"
                >
                  Redux Form
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "redux-wizard" ? "mm-active" : ""}`}
                  to="/redux-wizard"
                >
                  Redux Wizard
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${widget.includes(path) ? "mm-active" : ""}`}>
            <Link to="widget-basic" className="ai-icon">
              <i className="fas fa-cogs"></i>
              <span className="nav-text">Widget</span>
            </Link>
          </li> */}
          <li className={`${customers.includes(path) ? "mm-active" : ""}`}>
            <Link to="customers" className="ai-icon">
              <i className="fas fa-user-check"></i>
              <span className="nav-text">Customers</span>
            </Link>
          </li>
          {/* <li className={`${nft.includes(path) ? "mm-active" : ""}`}>
            <Link to="nft" className="ai-icon">
              <i className="fas fa-image"></i>
              <span className="nav-text">NFT</span>
            </Link>
          </li> */}

          {/* <li className={`${domains.includes(path) ? "mm-active" : ""}`}>
            <Link to="domains" className="ai-icon">
              <i className="fas fa-globe"></i>
              <span className="nav-text">Domains</span>
            </Link>
          </li> */}

          <li className={`${categories.includes(path) ? "mm-active" : ""}`}>
            <Link to="category-list" className="ai-icon">
              <i className="fas fa-list-alt"></i>

              <span className="nav-text">Categories</span>
            </Link>
          </li>

          <li className={`${Appearance.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-columns"></i>
              <span className="nav-text forms">Appearance</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "themes" ? "mm-active" : ""}`}
                  to="/themes"
                >
                  {" "}
                  Theme
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "pages" ? "mm-active" : ""}`}
                  to="/pages"
                >
                  Pages
                </Link>
              </li>

              <li>
                <Link
                  className={`${path === "blogs" ? "mm-active" : ""}`}
                  to="/blogs"
                >
                  {" "}
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "social-media" ? "mm-active" : ""}`}
                  to="/social-media"
                >
                  {" "}
                  Social Media
                </Link>
                <Link
                  className={`${path === "contact-us" ? "mm-active" : ""}`}
                  to="/contact-us"
                >
                  {" "}
                  Contact Us{" "}
                </Link>
              </li>
            </ul>
          </li>

          <li className={`${SEO.includes(path) ? "mm-active" : ""}`}>
            <Link className=" ai-icon" to="users-seo">
              <i className="fas fa-search"></i>
              <span className="nav-text">SEO</span>
            </Link>
          </li>

          {/* <i className="fas fa-user-check"></i>
          <span className="nav-text">Widget</span>
      
      </li> */}
          <li className={`${Packages.includes(path) ? "mm-active" : ""}`}>
            <Link to="change-packages" className="ai-icon">
              <i className="fas fa-gift"></i>
              <span className="nav-text">Packages</span>
            </Link>
          </li>

          {/* <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-file-alt"></i>

              <span className="nav-text forms">Forms</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "form-element" ? "mm-active" : ""}`}
                  to="/form-element"
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-wizard" ? "mm-active" : ""}`}
                  to="/form-wizard"
                >
                  {" "}
                  Wizard
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-editor-summernote" ? "mm-active" : ""
                  }`}
                  to="/form-editor-summernote"
                >
                  Summernote
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-pickers" ? "mm-active" : ""}`}
                  to="/form-pickers"
                >
                  Pickers
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-validation-jquery" ? "mm-active" : ""
                  }`}
                  to="/form-validation-jquery"
                >
                  Form Validate
                </Link>
              </li>
            </ul>
          </li> */}
          <li className={`${billing.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-file-alt"></i>
              <span className="nav-text forms">Billings</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "billing-history" ? "mm-active" : ""}`}
                  to="/billing-history"
                >
                  Billing History
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "billing-settings" ? "mm-active" : ""
                  }`}
                  to="/billing-settings"
                >
                  {" "}
                  Billing Settings
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Settings.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-cog"></i>
              <span className="nav-text forms">Settings</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${
                    path === "general-settings" ? "mm-active" : ""
                  }`}
                  to="/general-settings"
                >
                  General Settings
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "domain-settings" ? "mm-active" : ""}`}
                  to="/domain-settings"
                >
                  {" "}
                  Domain Settings
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to={{
                pathname: "https://" + props.store.store_domain,
              }}
              className="ai-icon"
              target="_blank"
            >
              <i className="fas fa-eye"></i>
              <span className="nav-text">View Store</span>
            </Link>
          </li>
          {/* <li className={`${table.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-table"></i>
              <span className="nav-text">Table</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "table-filtering" ? "mm-active" : ""}`}
                  to="/table-filtering"
                >
                  Table Filtering
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "table-sorting" ? "mm-active" : ""}`}
                  to="/table-sorting"
                >
                  Table Sorting
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "table-bootstrap-basic" ? "mm-active" : ""
                  }`}
                  to="/table-bootstrap-basic"
                >
                  Bootstrap
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "table-datatable-basic" ? "mm-active" : ""
                  }`}
                  to="/table-datatable-basic"
                >
                  Datatable
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="fas fa-clone"></i>
              <span className="nav-text">Pages</span>
            </Link>
            <ul>
              <li className={`${error.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  Error
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-400" ? "mm-active" : ""
                      }`}
                      to="/page-error-400"
                    >
                      Error 400
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-403" ? "mm-active" : ""
                      }`}
                      to="/page-error-403"
                    >
                      Error 403
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-404" ? "mm-active" : ""
                      }`}
                      to="/page-error-404"
                    >
                      Error 404
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-500" ? "mm-active" : ""
                      }`}
                      to="/page-error-500"
                    >
                      Error 500
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "page-error-503" ? "mm-active" : ""
                      }`}
                      to="/page-error-503"
                    >
                      Error 503
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className={`${
                    path === "page-lock-screen" ? "mm-active" : ""
                  }`}
                  to="/page-lock-screen"
                >
                  Lock Screen
                </Link>
              </li>
            </ul>
          </li> */}
        </MM>
        {/* <div className="side-bar-profile">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<div className="side-bar-profile-img">
					<img src={user} alt="" />
				</div>
				<div className="profile-info1">
					<h4 className="fs-18 font-w500">Levi Siregar</h4>
					<span>leviregar@mail.com</span>
				</div>
				<div className="profile-button">
					<i className="fas fa-caret-down scale5 text-light"></i>
				</div>
			</div>	
			<div className="d-flex justify-content-between mb-2 progress-info">
				<span className="fs-12"><i className="fas fa-star text-orange me-2"></i>Task Progress</span>
				<span className="fs-12">20/45</span>
			</div>
			<div className="progress default-progress">
				<div className="progress-bar bg-gradientf progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
					<span className="sr-only">45% Complete</span>
				</div>
			</div>
		</div> */}
        {/* <div className="copyright">
          <p>
            <strong>wimos</strong> © {new Date().getFullYear()}
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by Communiqo
          </p>
        </div> */}
      </PerfectScrollbar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    store: state.auth.selectedStore,
  };
};

export default connect(mapStateToProps)(SideBar);
