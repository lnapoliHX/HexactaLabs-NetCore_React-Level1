import { toast } from "react-toastify";
import { goBack } from "connected-react-router";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";

/* Actions */
function success(categories) {
  return {
    type: ActionTypes.UPDATE,
    categories
  };
}

export function update(categories) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .put(`/producttype/${categories.id}`, categories)
      .then(() => {
        toast.success("La categoria se editó con éxito");
        dispatch(success(categories));
        dispatch(setLoading(false));
        return dispatch(goBack());
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}
