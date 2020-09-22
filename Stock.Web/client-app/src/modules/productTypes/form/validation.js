import * as yup from "yup";
import "../../../common/helpers/YupConfig";

const schema = yup.object().shape({
  initial: yup.string().required(),
  description: yup
    .string()
    .description()
    .required()
});

export default schema;