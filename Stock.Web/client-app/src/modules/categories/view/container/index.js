import React, { Component } from "react";
import PropType from "prop-types";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getCategoryById } from "../../list/index";
import Presentation from "../presentation";
import Remove from "../../remove/container";

export class CategoryViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Presentation category={this.props.category} {...this.props} />
        <Route path="/producttype/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

CategoryViewPage.propTypes = {
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
)(CategoryViewPage);
