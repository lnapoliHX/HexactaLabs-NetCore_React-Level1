import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductTypesById } from "../../list/index";
import ProductTypes from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";

export class ProductTypesViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductTypes productTypes={this.props.productTypes} {...this.props} />
        <Route path="/productTypes/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProductTypesViewPage.propTypes = {
  productTypes: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductTypesById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypesViewPage);
