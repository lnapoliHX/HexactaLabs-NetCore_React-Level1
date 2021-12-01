import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getCategories, getAll } from "../index";
import Presentation from "../presentation";


const initialState = {
  id:"",
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
    const { categories, loading, ...rest } = this.props;

    return (
      <Presentation
        data={categories}
        dataLoading={loading}
        defaultPageSize={5}
        {...rest}
      />
    );
  }
}

CategoriesPage.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAll: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  categories: getCategories(state)
});

const mapDispatchToProps = {
  getAll,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPage);