import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getProductstype, getAll, fetchByFilters } from "../index";
import Presentation from "../presentation";

class ProductstypePage extends React.Component {
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
      [event.target.name]: event.target.value
    };
    this.setState({ filters: newFilters });
  };

  render() {
    return (
      <Presentation
        data={this.props.providers}
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

ProductstypePage.propTypes = {
  productstype: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { productstype: getProductstype(state) };
};

const mapDispatchToProps = {
  getAll,
  push,
  fetchByFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductstypePage);
