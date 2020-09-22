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

const LOADING = "PRODUCTTYPES_LOADING";
const SET = "PRODUCTTYPES__SET";
const CREATE = "PRODUCTTYPES__CREATE";
const UPDATE = "PRODUCTTYPES__UPDATE";
const REMOVE = "PRODUCTTYPES__REMOVE";

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
    ids: producttypes.map(producttype => producttype.id),
    byId: normalize(producttypes)
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
      .get("/producttype")
      .then((response) => {
        dispatch(setProducttypes(response.data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        apiErrorToast(error);
        dispatch(setLoading(false));
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

export function getProducttypesById(state) {
  return base(state).byId;
}

export function getProductTypeIds(state) {
  return base(state).ids;
}

export function getProductTypeById(state, id) {
  return getProducttypesById(state)[id] || {};
}

function makeGetProducttypesMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getProducttypesById(state)) {
      return value;
    }
    cache = getProducttypesById(state);
    value = Object.values(getProducttypesById(state));
    return value;
  };
}

export const getProducttypes = makeGetProducttypesMemoized();
