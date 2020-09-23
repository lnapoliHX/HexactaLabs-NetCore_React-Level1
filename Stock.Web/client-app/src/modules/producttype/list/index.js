import { cloneDeep, pickBy } from "lodash";
import { normalize } from "../../../common/helpers/normalizer";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  ids: [],
  byId: {}
};

/* Action types */

const LOADING = "PRODUCTSTYPE_LOADING";
const SET = "PRODUCTSTYPE_SET";
const CREATE = "PRODUCTSTYPE_CREATE";
const UPDATE = "PRODUCTSTYPE_UPDATE";
const REMOVE = "PRODUCTSTYPE_REMOVE";

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

function handleSet(state, { productstype }) {
  return {
    ...state,
    ids: productstype.map(producttype => producttype.id),
    byId: normalize(productstype)
  };
}

function handleNewProducttype(state, { producttype }) {
  return {
    ...state,
    ids: state.ids.concat([producttype.id]),
    byId: {
      ...state.byId,
      [producttype.id]: cloneDeep(producttype)
    }
  };
}

function handleUpdateProducttype(state, { producttype }) {
  return {
    ...state,
    byId: { ...state.byId, [producttype.id]: cloneDeep() }
  };
}

function handleRemoveProducttype(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter(producttypeId => producttypeId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, producttypeId) =>
        producttypeId !== `${id}`
          ? { ...acc, [producttypeId]: state.byId[producttypeId] }
          : acc,
      {}
    )
  };
}

const handlers = {
  [LOADING]:handleLoading,
  [SET]:    handleSet,
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

export function setProductstype(productstype) {
  return {
    type: SET,
    productstype
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setProductstype(response.data));
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
      .post("/producttype/search", pickBy(filters))
      .then(response => {
        dispatch(setProductstype(response.data));
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

export function getProductstypeById(state) {
  return base(state).byId;
}

export function getProducttypeIds(state) {
  return base(state).ids;
}

export function getProducttypeById(state, id) {
  return getProductstypeById(state)[id] || {};
}

function makeGetProductstypeMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getProductstypeById(state)) {
      return value;
    }
    cache = getProductstypeById(state);
    value = Object.values(getProductstypeById(state));
    return value;
  };
}

export const getProductstype = makeGetProductstypeMemoized();