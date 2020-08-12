import React, { Component } from "react";

import { EuiIcon, EuiSideNav } from "@elastic/eui";

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
      onClick: () => this.selectItem(name),
    };
  }

  render() {
    const sideNav = [
      this.createItem("Elasticsearch", {
        icon: <EuiIcon type="logoElasticsearch" />,
        items: [
          this.createItem("Data sources"),
          this.createItem("Users"),
          this.createItem("Roles"),
          this.createItem("Watches"),
          this.createItem(
            "Extremely long title will become truncated when the browser is narrow enough"
          ),
        ],
      }),
      this.createItem("Kibana", {
        icon: <EuiIcon type="logoKibana" />,
        items: [
          this.createItem("Advanced settings", {
            items: [
              this.createItem("General"),
              this.createItem("Timelion", {
                items: [
                  this.createItem("Time stuff", {
                    icon: <EuiIcon type="clock" />,
                  }),
                  this.createItem("Lion stuff", {
                    icon: <EuiIcon type="stats" />,
                  }),
                ],
              }),
              this.createItem("Visualizations"),
            ],
          }),
          this.createItem("Index Patterns"),
          this.createItem("Saved Objects"),
          this.createItem("Reporting"),
        ],
      }),
      this.createItem("Logstash", {
        icon: <EuiIcon type="logoLogstash" />,
        items: [this.createItem("Pipeline viewer")],
      }),
    ];

    const { isSideNavOpenOnMobile } = this.state;

    return (
      <EuiSideNav
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={isSideNavOpenOnMobile}
        items={sideNav}
        style={{ width: 192 }}
      />
    );
  }
}

export default Sidebar;
