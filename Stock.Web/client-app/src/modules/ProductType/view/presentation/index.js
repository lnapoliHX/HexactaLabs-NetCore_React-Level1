import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";

const ProductTypeView = props => {
  return (
    <Container fluid>
   
      <Row>
        <Col lg="2">Initials</Col>
        <Col>{props.producttype.initials}</Col>
      </Row>
      <Row>
        <Col lg="2">Description</Col>
        <Col>{props.producttype.description}</Col>
      </Row>
      <div className="store-view__button-row">
        <Button
          className="store-form__button"
          color="primary"
          onClick={() => props.push(`/ProductType/update/${props.match.params.id}`)}
        >
          Editar
        </Button>
        <Button
          className="store-form__button"
          color="danger"
          onClick={() =>
            props.push(`/ProductType/view/${props.match.params.id}/remove`)
          }
        >
          Eliminar
        </Button>
        <Button
          className="store-form__button"
          color="default"
          onClick={() => props.push(`/ProductType`)}
        >
          Volver
        </Button>
      </div>
    </Container>
  );
};

ProductTypeView.propTypes = {
  producttype: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default ProductTypeView;
