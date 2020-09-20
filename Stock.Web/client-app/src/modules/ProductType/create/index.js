import api from "../../../common/api";
import { replace } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";


/* Actions */
function success(ProductType) {
  return {
    type: ActionTypes.CREATE,
    ProductType
  };
}

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function create(ProductType) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .post(`/ProductType/`, ProductType)
      .then(response => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("El tipo producto se creo correctamente");
        
        return dispatch(replace("/ProductType"));
      })
      .catch(error => {
        return handleError(dispatch, error);
      });
  };
}
