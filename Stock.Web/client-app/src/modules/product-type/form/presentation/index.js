import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "reactstrap";
import PropTypes from "prop-types";
import Validator from "../../../../common/helpers/YupValidator";
import schema from "../validation";
import InputField from "../../../../components/inputs/InputField";


const ProductTypeForm = props => {
  const { handleSubmit, handleCancel } = props;
  return (
    <Form onSubmit={handleSubmit} className="addForm">
      <Field label="Iniciales" name="initials" component={InputField} type="text" />
      <Field label="Descripción" name="description" component={InputField} type="text" />
      <Button className="productType-form__button" color="primary" type="submit">
        GUARDAR
      </Button>
      <Button
        className="productType-form__button"
        color="secondary"
        type="button"
        onClick={handleCancel}
      >
        CANCELAR
      </Button>
    </Form>
  );
};

ProductTypeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "product-type",
  validate: Validator(schema),
  enableReinitialize: true
})(ProductTypeForm);
