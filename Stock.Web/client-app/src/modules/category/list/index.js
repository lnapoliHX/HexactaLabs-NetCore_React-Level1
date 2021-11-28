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

const LOADING = "CATEGORYS_LOADING";
const SET = "CATEGORYS_SET";
const CREATE = "CATEGORYS_CREATE";
const UPDATE = "CATEGORYS_UPDATE";
const REMOVE = "CATEGORYS_REMOVE";

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

function handleSet(state, { categorys }) {
  return {
    ...state,
    ids: categorys.map(category => category.id),
    byId: normalize(categorys)
  };
}

function handleNewCategory(state, { category }) {
  return {
    ...state,
    ids: state.ids.concat([category.id]),
    byId: {
      ...state.byId,
      [category.id]: cloneDeep(category)
    }
  };
}

function handleUpdateCategory(state, { category }) {
  return {
    ...state,
    byId: { ...state.byId, [category.id]: cloneDeep(category) }
  };
}

function handleRemoveCategory(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter(categoryId => categoryId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, categoryId) =>
        categoryId !== `${id}`
          ? { ...acc, [categoryId]: state.byId[categoryId] }
          : acc,
      {}
    )
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewCategory,
  [UPDATE]: handleUpdateCategory,
  [REMOVE]: handleRemoveCategory
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

export function setCategorys(categorys) {
  return {
    type: SET,
    categorys
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setCategorys(response.data));
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
        dispatch(setCategorys(response.data));
      })
      .catch(error => {
        apiErrorToast(error);
      });
  };
}

/* Selectors */
function base(state) {
  return state.category.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getCategorysById(state) {
  return base(state).byId;
}

export function getCategoryIds(state) {
  return base(state).ids;
}

export function getCategoryById(state, id) {
  return getCategorysById(state)[id] || {};
}

function makeGetCategorysMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getCategorysById(state)) {
      return value;
    }
    cache = getCategorysById(state);
    value = Object.values(getCategorysById(state));
    return value;
  };
}

export const getCategorys = makeGetCategorysMemoized();
