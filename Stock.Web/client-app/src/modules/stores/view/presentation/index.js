import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";

const StoreView = props => {
  return (
    <Container fluid>
      <div className="block-header">
      <h1>{props.store.name}</h1>
      </div>
      <div className="info-box">
        <Row>
          <Col lg="2">Dirección</Col>
          <Col>{props.store.address}</Col>
        </Row>
        <Row>
          <Col lg="2">Teléfono</Col>
          <Col>{props.store.phone}</Col>
        </Row>
        </div>
      <div className="store-view__button-row">
        <Button
          className="store-form__button"
          color="primary"
          onClick={() => props.push(`/store/update/${props.match.params.id}`)}
        >
          Editar
        </Button>
        <Button
          className="store-form__button"
          color="danger"
          onClick={() =>
            props.push(`/store/view/${props.match.params.id}/remove`)
          }
        >
          Eliminar
        </Button>
        <Button
          className="store-form__button"
          color="default"
          onClick={() => props.push(`/store`)}
        >
          Volver
        </Button>
      </div>
    </Container>
  );
};

StoreView.propTypes = {
  store: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default StoreView;
