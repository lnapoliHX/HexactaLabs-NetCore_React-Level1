import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getCategories, getAll } from "../index";
import Presentation from "../presentation";

const initialState = {
  initials: "",
  description: "",
  condition: "AND"
};

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  render() {
    return (
      <Presentation
        data={this.props.categories}
        dataLoading={this.props.loading}
        defaultPageSize={5}
        {...this.props}
      />
    );
  }
}

CategoriesPage.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { categories: getCategories(state) };
};

const mapDispatchToProps = {
  getAll,
  push,
  //fetchByFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPage);
