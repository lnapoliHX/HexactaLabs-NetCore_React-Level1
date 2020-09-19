import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";

const ProductTypeView = props => {
  return (
	<Container fluid>
		<h3>Id:{props.productType.id}</h3>
		<Row>
        <Col lg="2">Initials</Col>
        <Col>{props.productType.initials}</Col>
      </Row>
      <Row>
        <Col lg="2">Descr</Col>
        <Col>{props.productType.description}</Col>
      </Row>
	
		
		<div className="productType-view__button-row">

			<Button title="Editar" aria-label="Editar"
				className="productType-form__button"
				color="primary"
				onClick={() =>
						props.push(`/product-type/update/${props.match.params.id}`)
						}
			>
			
			</Button>

			<Button title="Eliminar" aria-label="Eliminar"
			className="productType-form__button"
			color="danger"
			onClick={() =>
				props.push(`/product-type/view/${props.match.params.id}/remove`)
			}
			>
			
			</Button>
			<
				Button title="Volver" aria-label="Volver"
			className="productType-form__button btn-outline-secondary"
			color="default"
			onClick={() => props.push(`/product-type`)}
			>
			
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
