import { pickBy } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  producttypes: []
};

/* Action types */

const LOADING = "PRODUCTTYPES_LOADING";
const SET = "PRODUCTTYPES_SET";
const CREATE = "PRODUCTTYPES_CREATE";
const UPDATE = "PRODUCTTYPES_UPDATE";
const REMOVE = "PRODUCTTYPES_REMOVE";

export const ActionTypes = {
  LOADING,
  SET,
  CREATE,
  UPDATE,
  REMOVE
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleSet(state, { producttypes }) {
  return {
    ...state,
    producttypes
  };
}

function handleNewProductTypes(state, { producttypes }) {
  return {
    ...state,
    producttypes: state.producttypes.concat(producttypes)
  };
}

function handleUpdateProductTypes(state, { producttype }) {
  return {
    ...state,
    producttypes: state.producttypes.map(s => (s.id === producttype.id ? producttype : s))
  };
}

function handleRemoveProductTypes(state, { id }) {
  return {
    ...state,
    producttypes: state.producttypes.filter(s => s.id !== id)
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProductTypes,
  [UPDATE]: handleUpdateProductTypes,
  [REMOVE]: handleRemoveProductTypes
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

/* Actions */
export function setLoading(status) {
  return {
    type: LOADING,
    loading: status
  };
}

export function setProductTypes(producttypes) {
  return {
    type: SET,
    producttypes
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setProductTypes(response.data));
        return dispatch(setLoading(false));
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

export function getById(id) {
  return getAll({ id });
}

export function fetchByFilters(filters) {
  return function(dispatch) {
    return api
      .post("/ProductType/search", pickBy(filters))
      .then(response => {
        dispatch(setProductTypes(response.data));
      })
      .catch(error => {
        apiErrorToast(error);
      });
  };
}

/* Selectors */
function base(state) {
  return state.productType.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getProductType(state) {
  return base(state).producttypes;
}

export function getProductTypeById(state, id) {
  return getProductType(state).find(s => s.id === id);
}
