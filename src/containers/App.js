import React, { Component } from "react";
import { connect } from "react-redux";

// import PropTypes from "prop-types";

// ========== General styles ==========
import "@elastic/eui/dist/eui_theme_light.css";
import "./App.scss";

import Private from "../layout/private";

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    // uncomment if wants to separate auth path
    // const { isAuthenticated } = this.props;
    return <Private />;
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
