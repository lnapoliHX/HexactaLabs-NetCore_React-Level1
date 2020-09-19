import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  producttypes: [],
};

/* Action types */

const LOADING = "PRODUCTTYPE_LOADING";
const SET = "PRODUCTTYPE_SET";
const CREATE = "PRODUCTTYPE_CREATE";
const UPDATE = "PRODUCTTYPE_UPDATE";
const REMOVE = "PRODUCTTYPE_REMOVE";

export const ActionTypes = {
  LOADING,
  SET,
  CREATE,
  UPDATE,
  REMOVE,
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading,
  };
}

function handleSetProductType(state, { producttypes }) {
  return {
    ...state,
    producttypes,
  };
}

function handleNewProductType(state, { producttype }) {
  return {
    ...state,
    producttypes: state.producttypes.concat(producttype),
  };
}

function handleUpdateProductType(state, { producttype }) {
  return {
    ...state,
    producttypes: state.producttypes.map((p) =>
      p.id === producttype.id ? producttype : p
    ),
  };
}

function handleRemoveProductType(state, { id }) {
  return {
    ...state,
    producttypes: state.producttypes.filter((p) => p.id !== id),
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSetProductType,
  [CREATE]: handleNewProductType,
  [UPDATE]: handleUpdateProductType,
  [REMOVE]: handleRemoveProductType,
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

/* Actions */
export function setLoading(status) {
  return {
    type: LOADING,
    loading: status,
  };
}

export function SetProductTypes(producttypes) {
  return {
    type: SET,
    producttypes,
  };
}

export function getAll() {
  return (dispatch) => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then((response) => {
        dispatch(SetProductTypes(response.data));
        return dispatch(setLoading(false));
      })
      .catch((error) => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

export function getById(id) {
  return getAll({ id });
}

/* Selectors */
function base(state) {
  return state.producttype.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getProductTypes(state) {
  return base(state).producttypes;
}

export function getProductTypeById(state, id) {
  return getProductTypes(state).find((p) => p.id === id);
}
