import * as yup from "yup";
import "../../../common/helpers/YupConfig";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  initials: yup.string().required()
});
export default schema;
