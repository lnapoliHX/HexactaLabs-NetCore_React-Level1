import * as yup from "yup";
import "../../../common/helpers/YupConfig";

const schema = yup.object().shape({
  description: yup.string().required(),
  initials: yup.string().required()
});

export default schema;
