import React from "react";
import Presentation from "../presentation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getProductTypes, getAll } from "../index";


class ProductTypePage extends React.Component {
  constructor() {
    super();
    this.state={};
  }

  render() {
    return (
      <Presentation
        data={this.props.productTypes}
        dataLoading={this.props.loading}
        defaultPageSize={5}
        filters={this.state.filters}
        {...this.props}
      />
    );
  }
}

ProductTypePage.propTypes = {
  productTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { productTypes: getProductTypes(state) };
};

const mapDispatchToProps = {
  getAll,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypePage);
