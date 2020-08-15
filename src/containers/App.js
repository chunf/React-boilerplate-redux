import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Redirect } from "react-router-dom";
import {
  EuiHeader,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiPageContent,
  EuiIcon,
  EuiHeaderLogo,
  EuiPopover,
  EuiHeaderSectionItemButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiAvatar,
} from "@elastic/eui";

import { createBrowserHistory } from "history";

// import PropTypes from "prop-types";

// ========== General styles ==========
import "@elastic/eui/dist/eui_theme_light.css";

import "./App.scss";
import Sidebar from "./Sidebar";

const routeList = [
  {
    path: "/",
    name: "Home",
    component: React.lazy(() => import("../containers/Home")),
    exact: true,
    icon: <EuiIcon type="logoElasticsearch" />,
  },
];

function renderRoute(route) {
  return (
    <>
      <route.component path={route.path} exact={route.exact} />
      {route.children ? route.children.map(renderRoute) : null}
    </>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuVisible: false,
    };
  }

  setIsUserMenuVisible(value) {
    this.setState({
      isUserMenuVisible: value,
    });
  }

  renderPrivateRoutes() {
    const { isUserMenuVisible } = this.state;

    const renderLogo = (
      <EuiHeaderLogo
        iconType="logoKibana"
        href="#"
        aria-label="Go to home page"
      />
    );

    // const breadcrumbs = [
    //   {
    //     text: "Management",
    //     href: "#",
    //     onClick: (e) => {
    //       e.preventDefault();
    //       console.log("You clicked management");
    //     },
    //     "data-test-subj": "breadcrumbsAnimals",
    //     className: "customClass",
    //   },
    //   {
    //     text: "Truncation test is here for a really long item",
    //     href: "#",
    //     onClick: (e) => {
    //       e.preventDefault();
    //       console.log("You clicked truncation test");
    //     },
    //   },
    //   {
    //     text: "hidden",
    //     href: "#",
    //     onClick: (e) => {
    //       e.preventDefault();
    //       console.log("You clicked hidden");
    //     },
    //   },
    //   {
    //     text: "Users",
    //     href: "#",
    //     onClick: (e) => {
    //       e.preventDefault();
    //       console.log("You clicked users");
    //     },
    //   },
    //   {
    //     text: "Create",
    //   },
    // ];

    // const renderSearch = (
    //   <EuiFieldSearch
    //     placeholder="Search for anything"
    //     aria-label="Search for anything"
    //     compressed
    //   />
    // );
    const userMenu = (
      <EuiPopover
        id="guideHeaderUserMenuExample"
        ownFocus
        button={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <EuiHeaderSectionItemButton
            aria-controls="guideHeaderUserMenuExample"
            aria-expanded={isUserMenuVisible}
            aria-haspopup="true"
            aria-label="User menu"
            onClick={() => this.setIsUserMenuVisible(!isUserMenuVisible)}
          >
            <EuiAvatar name="John Username" size="s" />
          </EuiHeaderSectionItemButton>
        }
        isOpen={isUserMenuVisible}
        anchorPosition="downRight"
        closePopover={() => this.setIsUserMenuVisible(false)}
      >
        <div style={{ width: 320 }}>
          <EuiFlexGroup direction="column">
            <EuiFlexItem grow={false}>Content grid item</EuiFlexItem>
            <EuiFlexItem grow={false}>Another content grid item</EuiFlexItem>
            <EuiFlexItem grow={false}>Using the column direction</EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    );

    const sections = [
      {
        items: [renderLogo],
        borders: "right",
        // breadcrumbs,
        breadcrumbProps: {
          "aria-label": "Header sections breadcrumbs",
        },
      },
      // {
      //   items: [renderSearch, <div style={{ width: 8 }} />],
      //   borders: "none",
      // },
      {
        items: [userMenu],
      },
    ];

    return (
      <>
        <EuiHeader sections={sections} />

        <EuiPage>
          <EuiPageSideBar>
            {/* <h1>Sidebar</h1> */}

            <Sidebar routeList={routeList} />
          </EuiPageSideBar>
          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <h1>Page title</h1>
                </EuiTitle>
              </EuiPageHeaderSection>
              <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent>{routeList.map(renderRoute)}</EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }

  render() {
    // uncomment if wants to separate auth path
    // const { isAuthenticated } = this.props;

    return (
      <Suspense fallback="loading...">
        <Router history={createBrowserHistory()}>
          <Switch>
            {/* {isAuthenticated ? routeList.map(renderRoute) : renderLoginRoute()} */}
            {/* {routeList.map(renderRoute)} */}
            {this.renderPrivateRoutes()}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

App.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.User.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
