import React, { Suspense, Component } from "react";

import {
  EuiHeader,
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
  EuiPopover,
  EuiHeaderSectionItemButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiAvatar,
} from "@elastic/eui";
import { Route, Switch, Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import routeList from "../route";

function renderRoute(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      key={route.name}
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(props) => <route.component {...props} />}
    />
  );
}

function flattenRoute(route) {
  let routes = [];
  if (route.children) {
    route.children.forEach((childRoute) => {
      const childRoutes = flattenRoute(childRoute);

      routes = routes.concat(childRoutes);
    });
  }

  const oriRoute = route;
  delete oriRoute.children;
  routes.push(oriRoute);

  return routes;
}

function flattenRoutes() {
  return routeList.map(flattenRoute).reduce((prev, curr) => {
    return prev.concat(curr);
  }, []);
}

class Private extends Component {
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

  // eslint-disable-next-line class-methods-use-this
  renderLogo() {
    return <h2>Heron Automata</h2>;
  }

  renderUserMenu() {
    const { isUserMenuVisible } = this.state;
    return (
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
  }

  render() {
    const sections = [
      {
        items: [this.renderLogo()],
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
        items: [this.renderUserMenu()],
      },
    ];

    return (
      <>
        <EuiHeader sections={sections} />

        <EuiPage>
          <EuiPageSideBar>
            <Sidebar routeList={routeList} />
          </EuiPageSideBar>
          <EuiPageBody component="div">
            <Suspense fallback="loading...">
              <Switch>
                {flattenRoutes().map(renderRoute)}

                <Redirect from="*" to="/" />
              </Switch>
            </Suspense>
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }
}

export default Private;
