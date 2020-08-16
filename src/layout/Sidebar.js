import React, { Component } from "react";

import { EuiSideNav } from "@elastic/eui";
import PropTypes from "prop-types";

import history from "../router/history";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
      selectedItemName: null,
    };

    this.setIsSideNavOpenOnMobile = this.setIsSideNavOpenOnMobile.bind(this);
    this.toggleOpenOnMobile = this.toggleOpenOnMobile.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  setIsSideNavOpenOnMobile() {
    const { isSideNavOpenOnMobile } = this.state;
    this.setState({
      isSideNavOpenOnMobile: !isSideNavOpenOnMobile,
    });
  }

  toggleOpenOnMobile() {
    const { isSideNavOpenOnMobile } = this.state;
    this.setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  }

  selectItem(name) {
    this.setState({
      selectedItemName: name,
    });
  }

  createItem(name, data) {
    const { selectedItemName } = this.state;

    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      ...data,
      id: name,
      name,
      isSelected: selectedItemName === name,
      onClick: () => {
        this.selectItem(name);
        history.push(data.path);
      },
    };
  }

  convertRoutestoMenu(routes) {
    return routes.map((route) => {
      let items = [];
      if (route.children) {
        items = this.convertRoutestoMenu(route.children);
      }

      return this.createItem(route.name, {
        icon: route.icon,
        items,
        path: route.path,
      });
    });
  }

  render() {
    const { isSideNavOpenOnMobile } = this.state;
    const { routeList } = this.props;

    return (
      <EuiSideNav
        mobileTitle="Menu"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={isSideNavOpenOnMobile}
        items={this.convertRoutestoMenu(routeList)}
      />
    );
  }
}

Sidebar.propTypes = {
  routeList: PropTypes.array.isRequired,
};

export default Sidebar;
