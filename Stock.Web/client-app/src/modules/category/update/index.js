import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";
import { goBack } from "connected-react-router";

/* Actions */
function success(category) {
  return {
    type: ActionTypes.UPDATE,
    category
  };
}

export function update(category) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .put(`/producttype/${category.id}`, category)
      .then(() => {
        toast.success("El proveedor se editó con éxito");
        dispatch(success(category));
        dispatch(setLoading(false));
        return dispatch(goBack());
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}
