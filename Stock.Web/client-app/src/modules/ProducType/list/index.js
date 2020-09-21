import { pickBy } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  producttypes: []
};

/* Action types */

const LOADING = "STORES_LOADING";
const SET = "STORES_SET";
const CREATE = "STORES_CREATE";
const UPDATE = "STORES_UPDATE";
const REMOVE = "STORES_REMOVE";

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

function handleNewProducttype(state, { producttype }) {
  return {
    ...state,
    producttypes: state.producttypes.concat(producttype)
  };
}

function handleUpdateProducttype(state, { producttype }) {
  return {
    ...state,
    producttypes: state.producttypes.map(s => (s.id === producttype.id ? producttype : s))
  };
}

function handleRemoveProducttype(state, { id }) {
  return {
    ...state,
    producttypes: state.producttypes.filter(s => s.id !== id)
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProducttype,
  [UPDATE]: handleUpdateProducttype,
  [REMOVE]: handleRemoveProducttype
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

export function setProducttypes(producttypes) {
  return {
    type: SET,
    producttypes
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/productType")
      .then(response => {
        dispatch(setProducttypes(response.data));
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
        dispatch(setProducttypes(response.data));
      })
      .catch(error => {
        apiErrorToast(error);
      });
  };
}

/* Selectors */
function base(state) {
  return state.producttype.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getProducttypes(state) {
  return base(state).producttypes;
}

export function getProducttypesById(state, id) {
  return getProducttypes(state).find(s => s.id === id);
}
