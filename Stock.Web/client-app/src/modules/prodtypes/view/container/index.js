import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducttypeById } from "../../list/index";
import ProductType from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";

export class ProducttypeViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductType product={this.props.producttype} {...this.props} />
        <Route path="/producttype/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProducttypeViewPage.propTypes = {
  producttype: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    producttype: getProducttypeById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProducttypeViewPage);
