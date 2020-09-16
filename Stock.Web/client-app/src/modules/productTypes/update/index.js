import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";
import { goBack } from "connected-react-router";

/* Actions */
function success(productTypes) {
  return {
    type: ActionTypes.UPDATE,
    productTypes
  };
}

export function update(productTypes) {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .put(`/productTypes/${productTypes.id}`, productTypes)
      .then(() => {
        toast.success("La categoría se editó con éxito");
        dispatch(success(productTypes));
        dispatch(setLoading(false));
        return dispatch(goBack());
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}
