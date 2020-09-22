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

const LOADING = "CATEGORIES_LOADING";
const SET = "CATEGORIES_SET";
const CREATE = "CATEGORIES_CREATE";
const UPDATE = "CATEGORIES_UPDATE";
const REMOVE = "CATEGORIES_REMOVE";

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

function handleSet(state, { productType }) {
  return {
    ...state,
    ids: productType.map(productType => productType.id),
    byId: normalize(productType)
  };
}

function handleNewProductType(state, { productType }) {
  return {
    ...state,
    ids: state.ids.concat([productType.id]),
    byId: {
      ...state.byId,
      [productType.id]: cloneDeep(productType)
    }
  };
}

function handleUpdateProductType(state, { productType }) {
  return {
    ...state,
    byId: { ...state.byId, [productType.id]: cloneDeep(productType) }
  };
}

function handleRemoveProductType(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter(productTypeId => productTypeId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, productTypeId) =>
        productTypeId !== `${id}`
          ? { ...acc, [productTypeId]: state.byId[productTypeId] }
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

export function setProductsTypes(productsTypes) {
  return {
    type: SET,
    productsTypes
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setProductsTypes(response.data));
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
        dispatch(setProductsTypes(response.data));
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

export function getProductsTypesById(state) {
  return base(state).byId;
}

export function getProductTypeIds(state) {
  return base(state).ids;
}

export function getProductTypeById(state, id) {
  return getProductsTypesById(state)[id] || {};
}

function makeGetProductsTypesMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getProductsTypesById(state)) {
      return value;
    }
    cache = getProductsTypesById(state);
    value = Object.values(getProductsTypesById(state));
    return value;
  };
}

export const getProductsTypes = makeGetProductsTypesMemoized();
