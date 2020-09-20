import { cloneDeep, pickBy } from "lodash";
import { normalize } from "../../../common/helpers/normalizer";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  ids: [],
  byId: {},
};

/* Action types */

const LOADING = "PRODUCTYPE_LOADING";
const SET = "PRODUCTYPE_SET";
const CREATE = "PRODUCTYPE_CREATE";
const UPDATE = "PRODUCTYPE_UPDATE";
const REMOVE = "PRODUCTYPE_REMOVE";

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

function handleSet(state, { productTypes }) {
  return {
    ...state,
    ids: productTypes.map((productType) => productType.id),
    byId: normalize(productTypes),
  };
}

function handleNewProductType(state, { productType }) {
  return {
    ...state,
    ids: state.ids.concat([productType.id]),
    byId: {
      ...state.byId,
      [productType.id]: cloneDeep(productType),
    },
  };
}

function handleUpdateProductType(state, { productType }) {
  return {
    ...state,
    byId: { ...state.byId, [productType.id]: cloneDeep(productType) },
  };
}

function handleRemoveProductType(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter((productTypeId) => productTypeId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, productTypeId) =>
        productTypeId !== `${id}`
          ? { ...acc, [productTypeId]: state.byId[productTypeId] }
          : acc,
      {}
    ),
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
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

export function setProductTypes(productTypes) {
  return {
    type: SET,
    productTypes,
  };
}

export function getAll() {
  return (dispatch) => {
    dispatch(setLoading(true));
    return api
      .get("/productType")
      .then((response) => {
        dispatch(setProductTypes(response.data));
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

export function fetchByFilters(filters) {
  return function (dispatch) {
    return api
      .post("/productType/search", pickBy(filters))
      .then((response) => {
        dispatch(setProductTypes(response.data));
      })
      .catch((error) => {
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

export function getProductTypesById(state) {
  return base(state).byId;
}

export function getProductTypeIds(state) {
  return base(state).ids;
}

export function getProductTypeById(state, id) {
  return getProductTypesById(state)[id] || {};
}

function makeGetProductTypesMemoized() {
  let cache;
  let value = [];
  return (state) => {
    if (cache === getProductTypesById(state)) {
      return value;
    }
    cache = getProductTypesById(state);
    value = Object.values(getProductTypesById(state));
    return value;
  };
}

export const getProductTypes = makeGetProductTypesMemoized();
