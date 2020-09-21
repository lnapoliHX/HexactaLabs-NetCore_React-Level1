import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getProducts, getAll, fetchByFilters } from "../index";
import Presentation from "../presentation";

class ProductsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: {
        initials: "",
        description: "",
        condition: "AND"
      }
    };
  }

  filterChanged = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.initials]: event.target.value
    };
    this.setState({ filters: newFilters });
  };

  render() {
    return (
      <Presentation
        data={this.props.products}
        dataLoading={this.props.loading}
        defaultPageSize={5}
        filters={this.state.filters}
        handleFilter={this.filterChanged}
        submitFilter={() => this.props.fetchByFilters(this.state.filters)}
        clearFilter={this.props.getAll}
        {...this.props}
      />
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { products: getProducts(state) };
};

const mapDispatchToProps = {
  getAll,
  push,
  fetchByFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
