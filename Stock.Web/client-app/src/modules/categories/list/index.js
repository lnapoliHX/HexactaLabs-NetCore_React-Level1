import { cloneDeep } from "lodash";
import { normalize } from "../../../common/helpers/normalizer"
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

function handleSet(state, { categories }) {
  return {
    ...state,
    ids: categories.map(categories => categories.id),
    byId: normalize(categories)
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

export function setCategories(categories) {
  return {
    type: SET,
    categories
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setCategories(response.data));
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

/* Selectors */
function base(state) {
  return state.category.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getCategoriesById(state) {
  return base(state).byId;
}

export function getCategoryIds(state) {
  return base(state).ids;
}

export function getCategoryById(state, id) {
  return getCategoriesById(state)[id] || {};
}

function makeGetCategoriesMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getCategoriesById(state)) {
      return value;
    }
    cache = getCategoriesById(state);
    value = Object.values(getCategoriesById(state));
    return value;
  };
}

export const getCategories = makeGetCategoriesMemoized();