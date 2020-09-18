import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import ReactTable from "react-table";
import columns from "./ColumnsConfig";

const Presentation = props => {
  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Categorias</h1>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="category__button"
            color="primary"
            onClick={() => props.push(props.urls.create)}
          >
            <FaPlus className="category__button-icon" />
            Agregar
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            className="-striped -highlight"
            data={props.data}
            loading={props.dataLoading}
            columns={columns}
            defaultPageSize={props.defaultPageSize}
          />
        </Col>
      </Row>
    </Container>
  );
};

Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  onFilterChange: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired
};

export default Presentation;
