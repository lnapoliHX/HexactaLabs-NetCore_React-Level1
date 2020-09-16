import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducttypeById } from "../../list/index";
import ProductTypes from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";

export class ProductTypesViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductTypes producttype={this.props.producttype} {...this.props} />
        <Route path="/producttype/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProductTypesViewPage.propTypes = {
  producttype: PropType.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    producttype: getProducttypeById(state, ownProps.match.params.id),
  };
};

const mapDispatchToProps = {
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypesViewPage);
