import { toast } from "react-toastify";
import { goBack } from "connected-react-router";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";

/* Actions */
function success(category) {
  return {
    type: ActionTypes.UPDATE,
    category
  };
}

export function update(category) {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .put(`/producttype/${category.id}`, category)
      .then(() => {
        toast.success("La categoría se editó con éxito");
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
