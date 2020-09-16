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
  REMOVE
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleSet(state, { producttype }) {
  return {
    ...state,
    ids: producttype.map(producttype => producttype.id),
    byId: normalize(producttype)
  };
}

function handleNewProductType(state, { producttype }) {
  return {
    ...state,
    ids: state.ids.concat([producttype.id]),
    byId: {
      ...state.byId,
      [producttype.id]: cloneDeep(producttype)
    }
  };
}

function handleUpdateProductType(state, { producttype }) {
  return {
    ...state,
    byId: { ...state.byId, [producttype.id]: cloneDeep(producttype) }
  };
}

function handleRemoveProductType(state, { id }) {
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
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProductType,
  [UPDATE]: handleUpdateProductType,
  [REMOVE]: handleRemoveProductType
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

export function setProductType(producttype) {
  return {
    type: SET,
    producttype
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setProductType(response.data));
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
        dispatch(setProductType(response.data));
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

export function getProductsTypeById(state) {
  return base(state).byId;
}

export function getProductTypeIds(state) {
  return base(state).ids;
}

export function getProductTypeById(state, id) {
  return getProductsTypeById(state)[id] || {};
}

function makeGetProductTypeMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getProductsTypeById(state)) {
      return value;
    }
    cache = getProductTypeById(state);
    value = Object.values(getProductsTypeById(state));
    return value;
  };
}

export const getProductType= makeGetProductTypeMemoized();
