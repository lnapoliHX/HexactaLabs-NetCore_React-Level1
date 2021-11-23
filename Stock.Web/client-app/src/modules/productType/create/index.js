import api from "../../../common/api"
import { setLoading } from "../../productType/list"

/* Actions */
function success(productType) {
  return {
    type: ActionTypes.CREATE,
    productType
  };
}

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function create(productType) {
  return function(dispacht) {
	  dispacht(setLoading(true));
	  return api
	    .post(`/productType/`, productType)
		.then(response => {
			if (!response.data.success) {
				var error = {response: {data: {Message: response.data.message}}};

				return handleError(dispatch, error);
			  }

			  dispatch(success(response.data.data));
			  dispatch(setLoading(false));
			  toast.success("La categoría de producto se creó con éxito");
			  
			  return dispatch(replace("/productType"));
		})
		.catch(error => {
			return handleError(dispatch, error);
		  });
  }
}