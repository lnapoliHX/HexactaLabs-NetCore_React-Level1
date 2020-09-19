import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { Container, Row, Col } from "reactstrap";
import { getProducttypeById } from "../../list";
import { update } from "..";
import Form from "../../form/presentation";

const Update = ({ initialValues, update: onSubmit, goBack: onCancel }) => {
  return (
    <Container fluid>
      <Row>
        <div className="block-header">
          <h2>Edición</h2>
        </div>  
      </Row>
      <Row>
        <Col>
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            handleCancel={onCancel}
          />
        </Col>
      </Row>
    </Container>
  );
};

Update.propTypes = {
  initialValues: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  initialValues: getProducttypeById(state, ownProps.match.params.id)
});

const mapDispatchToProps = {
  update,
  goBack
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
