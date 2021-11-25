import React, { Component } from "react";
import PropType from "prop-types";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getCategoriesById } from "../../list/index";
import Presentation from "../presentation";
import Remove from "../../remove/container";

export class CategoriesViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Presentation store={this.props.store} {...this.props} />
        <Route path="/producttype/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

CategoriesViewPage.propTypes = {
  store: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    store: getCategoriesById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesViewPage);
