import React from "react";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import PropTypes from "prop-types";
import ProductTypesRemove from "../presentation";
import { remove } from "../index";

class ProductTypesRemovePage extends React.Component {
  render() {
    return (
      <ProductTypesRemove
        remove={() => this.props.remove(this.props.match.params.id)}
        goBack={this.props.goBack}
      />
    );
  }
}

ProductTypesRemovePage.propTypes = {
  remove: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = { remove, goBack };

export default connect(null, mapDispatchToProps)(ProductTypesRemovePage);
