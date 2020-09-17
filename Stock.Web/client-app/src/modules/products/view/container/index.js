import React, { Component } from "react";
import PropType from "prop-types";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getProductById } from "../../list/index";
import Presentation from "../presentation";
import Remove from "../../remove/container";

export class ProductViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Presentation product={this.props.product} {...this.props} />
        <Route path="/product/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ProductViewPage.propTypes = {
  product: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductById(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductViewPage);
