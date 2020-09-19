import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getProductTypes, getAll } from "../index";
import Presentation from "../presentation";

const initialState = {
  name: "",
  address: "",
  condition: "AND"
};

class ProductTypesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  render() {
    const { productTypes, loading, ...rest } = this.props;

    return (
      <Presentation
        data={productTypes}
        dataLoading={loading}
        defaultPageSize={5}
        {...rest}
      />
    );
  }
}

ProductTypesPage.propTypes = {
  productTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAll: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  productTypes: getProductTypes(state)
});

const mapDispatchToProps = {
  getAll,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypesPage);
