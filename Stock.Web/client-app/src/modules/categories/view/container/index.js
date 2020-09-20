import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoryById } from "../../list/index";
import Category from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";

export class CategoriesViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Category product={this.props.category} {...this.props} />
        <Route path="/category/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

CategoriesViewPage.propTypes = {
  category: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    category: getCategoryById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesViewPage);
