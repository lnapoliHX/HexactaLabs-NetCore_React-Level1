import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";

const CategoriesView = ({categories = {}, push, match}) => {

  return (
    <Container fluid>
      <h1>{categories.name}</h1>
      <Row>
        <Col lg="2">Iniciales</Col>
        <Col>{categories.initials}</Col>
      </Row>
      <Row>
        <Col lg="2">Description</Col>
        <Col>{categories.description}</Col>
      </Row>
      <div className="categories-view__button-row">
        <Button
          className="categories-form__button"
          color="primary"
          onClick={() => push(`/categories/update/${match.params.id}`)}
        >
          Editar
        </Button>
        <Button
          className="categories-form__button"
          color="danger"
          onClick={() =>
            push(`/categories/view/${match.params.id}/remove`)
          }
        >
          Eliminar
        </Button>
        <Button
          className="categories-form__button"
          color="default"
          onClick={() => push(`/categories`)}
        >
          Volver
        </Button>
      </div>
    </Container>
  );
};

CategoriesView.propTypes = {
  categories: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default CategoriesView;
