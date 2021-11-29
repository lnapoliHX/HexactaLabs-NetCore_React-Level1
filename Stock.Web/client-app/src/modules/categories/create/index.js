import api from "../../../common/api";
import { replace } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";

/* Actions */
function success(categories) {
  return {
    type: ActionTypes.CREATE,
    categories
  };
}

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function create(categories) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .post(`/producttype/`, categories)
      .then(response => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("La categoria se creó con éxito");
        
        return dispatch(replace("/categories"));
      })
      .catch(error => {
        return handleError(dispatch, error);
      });
  };
}
