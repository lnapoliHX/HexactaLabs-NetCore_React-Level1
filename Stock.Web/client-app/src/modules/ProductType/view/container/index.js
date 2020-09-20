import React, { Component } from "react";
import PropType from "prop-types";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getProductTypeById } from "../../list/index";
import Presentation from "../presentation";
import Remove from "../../remove/container";

export class ProductTypeViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Presentation producttype={this.props.producttype} {...this.props} />
        <Route path="/ProductType/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProductTypeViewPage.propTypes = {
  producttype: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    producttype: getProductTypeById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypeViewPage);
