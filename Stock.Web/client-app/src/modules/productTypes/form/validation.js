import * as yup from "yup";
import "../../../common/helpers/YupConfig";

const schema = yup.object().shape({
  initials: yup.string().required(),
  descriptions: yup.string().required()
});

export default schema;
