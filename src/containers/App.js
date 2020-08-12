import React, { Suspense, PureComponent } from "react";
import { connect } from "react-redux";
import { Router, Switch, Redirect } from "react-router-dom";
import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
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
  },
];

function renderRoute(route) {
  return <route.component path={route.path} exact={route.exact} />;
}

function renderPrivateRoutes() {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <h1>Sidebar</h1>

        <Sidebar />
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
        {routeList.map(renderRoute)}
      </EuiPageBody>
    </EuiPage>
  );
}

// function renderLoginRoute() {
//   const LoginPage = React.lazy(() => import("../containers/Login"));
//   return <LoginPage path="/" exact />;
// }

class App extends PureComponent {
  render() {
    // uncomment if wants to separate auth path
    // const { isAuthenticated } = this.props;

    return (
      <Suspense fallback="loading...">
        <Router history={createBrowserHistory()}>
          <Switch>
            {/* {isAuthenticated ? routeList.map(renderRoute) : renderLoginRoute()} */}
            {/* {routeList.map(renderRoute)} */}
            {renderPrivateRoutes()}
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
