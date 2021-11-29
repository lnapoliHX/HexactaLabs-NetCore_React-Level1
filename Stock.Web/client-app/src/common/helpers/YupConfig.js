import * as yup from "yup";


// eslint-disable-next-line no-unused-vars
yup.addMethod(yup.number, "format", function(formats, parseStrict) {
  return this.transform(function(value, original) {
    return original === "" ? null : value;
  });
});
