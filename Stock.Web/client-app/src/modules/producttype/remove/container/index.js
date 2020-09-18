import React from "react";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import PropTypes from "prop-types";
import StoreRemove from "../presentation";
import { remove } from "../index";

class StoreRemovePage extends React.Component {
  render() {
    return (
      <StoreRemove
        remove={() => this.props.remove(this.props.match.params.id)}
        goBack={this.props.goBack}
      />
    );
  }
}

StoreRemovePage.propTypes = {
  remove: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = { remove, goBack };

export default connect(
  null,
  mapDispatchToProps
)(StoreRemovePage);
