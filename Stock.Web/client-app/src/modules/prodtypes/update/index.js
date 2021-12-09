import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";
import { goBack } from "connected-react-router";

/* Actions */
function success(producttype) {
  return {
    type: ActionTypes.UPDATE,
    producttype
  };
}

export function update(producttype) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .put(`/provider/${producttype.id}`, producttype)
      .then(() => {
        toast.success("El tipo de producto se editó con éxito");
        dispatch(success(producttype));
        dispatch(setLoading(false));
        return dispatch(goBack());
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}
