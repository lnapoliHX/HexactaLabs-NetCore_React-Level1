import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";

const StoreView = props => {
  return (
    <Container fluid>
      <h1>{props.store.initials}</h1>
      <Row>
        <Col lg="2">Descripción</Col>
        <Col>{props.store.description}</Col>
      </Row>
      <div className="store-view__button-row">
        <Button
          className="store-form__button"
          color="primary"
          onClick={() => props.push(`/producttype/update/${props.match.params.id}`)}
        >
          Editar
        </Button>
        <Button
          className="store-form__button"
          color="danger"
          onClick={() =>
            props.push(`/producttype/view/${props.match.params.id}/remove`)
          }
        >
          Eliminar
        </Button>
        <Button
          className="store-form__button"
          color="default"
          onClick={() => props.push(`/producttype`)}
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
