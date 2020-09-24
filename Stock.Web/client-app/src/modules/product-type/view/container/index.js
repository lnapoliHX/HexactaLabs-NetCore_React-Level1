import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductTypeById } from "../../list/index";
import ProductType from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";

export class ProductTypeViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductType product={this.props.productType} {...this.props} />
        <Route path="/product-type/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProductTypeViewPage.propTypes = {
  productType: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    productType: getProductTypeById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypeViewPage);
