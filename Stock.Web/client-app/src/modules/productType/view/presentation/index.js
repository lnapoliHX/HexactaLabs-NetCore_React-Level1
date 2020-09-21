import React from "react";
import { FaEdit, FaTrash, FaAngleDoubleLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";

const ProductTypeView = props => {
  return (
    <Container fluid>
      <div className="block-header">
        <h1>Categoría de Producto</h1>
      </div>
      <div className="info-box">
        <Row>
          <Col lg="2">Iniciales</Col>
          <Col>{props.productType.initials}</Col>
        </Row>
        <Row>
          <Col lg="2">Descripcion</Col>
          <Col>{props.productType.description}</Col>
        </Row>
      </div>
      <div className="productType-view__button-row">
        <Button title="Editar" aria-label="Editar"
          className="productType-form__button"
          color="primary"
          onClick={() => props.push(`/producttype/update/${props.match.params.id}`)}
        ><FaEdit className="productType__button-icon" />Editar
        </Button>
        <Button title="Eliminar" aria-label="Eliminar"
          className="productType-form__button"
          color="danger"
          onClick={() =>
            props.push(`/producttype/view/${props.match.params.id}/remove`)
          }
        >
          <FaTrash className="productType__button-icon" />Eliminar
        </Button>
        <Button title="Volver" aria-label="Volver"
          className="productType-form__button"
          color="primary"
          onClick={() => props.push(`/productType`)}
        ><FaAngleDoubleLeft className="productType__button-icon" />Volver
        </Button>
      </div>
    </Container>
  );
};

ProductTypeView.propTypes = {
  productType: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default ProductTypeView;
