import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getProductTypes, getAll } from "../index";
import Presentation from "../presentation";

class ProductTypesPage extends React.Component {

  render() {
    return (
      <Presentation
        data={this.props.productTypes}
        dataLoading={this.props.loading}
        defaultPageSize={5}
        {...this.props}
      />
    );
  }
}

ProductTypesPage.propTypes = {
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
)(ProductTypesPage);
