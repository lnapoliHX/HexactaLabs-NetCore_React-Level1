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

const LOADING = "PRODUCT_TYPES_LOADING";
const SET = "PRODUCT_TYPES_SET";
const CREATE = "PRODUCT_TYPES_CREATE";
const UPDATE = "PRODUCT_TYPES_UPDATE";
const REMOVE = "PRODUCT_TYPES_REMOVE";

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

function handleSet(state, { prodcutTypes }) {
  return {
    ...state,
    ids: prodcutTypes.map(prodcutType => prodcutType.id),
    byId: normalize(prodcutTypes)
  };
}

function handleNewProductType(state, { prodcutType }) {
  return {
    ...state,
    ids: state.ids.concat([prodcutType.id]),
    byId: {
      ...state.byId,
      [prodcutType.id]: cloneDeep(prodcutType)
    }
  };
}

function handleUpdateProdcutType(state, { prodcutType }) {
  return {
    ...state,
    byId: { ...state.byId, [prodcutType.id]: cloneDeep(prodcutType) }
  };
}

function handleRemoveProductType(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter(prodcutTypeId => prodcutTypeId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, prodcutTypeId) =>
	  prodcutTypeId !== `${id}`
          ? { ...acc, [prodcutTypeId]: state.byId[prodcutTypeId] }
          : acc,
      {}
    )
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProductType,
  [UPDATE]: handleUpdateProdcutType,
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

export function setProductTypes(prodcutTypes) {
  return {
    type: SET,
    prodcutTypes
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/prodcutType")
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
      .post("/productType/search", pickBy(filters))
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
  return state.prodcutType.list;
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
  return state => {
    if (cache === getProductTypesById(state)) {
      return value;
    }
    cache = getProductTypesById(state);
    value = Object.values(getProductTypesById(state));
    return value;
  };
}

export const getProductTypes = makeGetProductTypesMemoized();
