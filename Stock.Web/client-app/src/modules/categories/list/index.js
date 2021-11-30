import { pickBy } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  categories: []
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
    categories
  };
}

function handleNewCategories(state, { category }) {
  return {
    ...state,
    categories: state.categories.concat(category)
  };
}

function handleUpdateCategories(state, { category }) {
  return {
    ...state,
    categories: state.categories.map(s => (s.id === category.id ? category : s))
  };
}

function handleRemoveCategories(state, { id }) {
  return {
    ...state,
    categories: state.categories.filter(s => s.id !== id)
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewCategories,
  [UPDATE]: handleUpdateCategories,
  [REMOVE]: handleRemoveCategories
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

export function fetchByFilters(filters) {
  return function(dispatch) {
    return api
      .post("/producttype/search", pickBy(filters))
      .then(response => {
        dispatch(setCategories(response.data));
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

export function getCategories(state) {
  return base(state).categories;
}

export function getCategoryById(state, id) {
  return getCategories(state).find(s => s.id === id);
}
