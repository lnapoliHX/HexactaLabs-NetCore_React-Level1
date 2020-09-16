import * as yup from "yup";
import "../../../common/helpers/YupConfig";

const schema = yup.object().shape({
  initials: yup.string(),
  description: yup.string()
});

export default schema;
