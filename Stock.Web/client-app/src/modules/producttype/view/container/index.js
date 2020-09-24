import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducttypeById } from "../../list/index";
import Producttype from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";

export class ProductstypeViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Producttype product={this.props.producttype} {...this.props} />
        <Route path="/producttype/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProductstypeViewPage.propTypes = {
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
)(ProductstypeViewPage);
