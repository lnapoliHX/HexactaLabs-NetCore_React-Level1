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

const LOADING = "PROVIDERS_LOADING";
const SET = "PROVIDERS_SET";
const CREATE = "PROVIDERS_CREATE";
const UPDATE = "PROVIDERS_UPDATE";
const REMOVE = "PROVIDERS_REMOVE";

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
    byId: { ...state.byId, [producttype.id]: cloneDeep(producttype) }
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
      .get("/producttype")
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
  return state.provider.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getProducttypesById(state) {
  return base(state).byId;
}

export function getProducttypesIds(state) {
  return base(state).ids;
}

export function getProducttypeById(state, id) {
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

export const getProviders = makeGetProducttypesMemoized();
