import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";

const CategoryView = props => {
  return (
    <Container fluid>
      <h1>{props.category.name}</h1>
      <Row>
        <Col lg="2">Iniciales</Col>
        <Col>{props.category.initials}</Col>
      </Row>
      <Row>
        <Col lg="2">Descripción</Col>
        <Col>{props.category.description}</Col>
      </Row>
      <div className="category-view__button-row">
        <Button
          className="category-form__button"
          color="primary"
          onClick={() => props.push(`/categories/update/${props.match.params.id}`)}
        >
          Editar
        </Button>
        <Button
          className="category-form__button"
          color="danger"
          onClick={() =>
            props.push(`/categories/view/${props.match.params.id}/remove`)
          }
        >
          Eliminar
        </Button>
        <Button
          className="category-form__button"
          color="default"
          onClick={() => props.push(`/categories`)}
        >
          Volver
        </Button>
      </div>
    </Container>
  );
};
CategoryView.propTypes = {
  category: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default CategoryView;
