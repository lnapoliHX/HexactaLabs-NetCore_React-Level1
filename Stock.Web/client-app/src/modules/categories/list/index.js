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

function handleNewCategories(state, { categoria }) {
  return {
    ...state,
    categories: state.ids.concat(categoria)

  };
}

function handleUpdateCategories(state, { categorie }) {
  return {
    ...state,
    categories: state.categories.map(p => (p.id === categorie ? categorie : p))
  };
}

function handleRemoveCategories(state, { id }) {
  return {
    ...state,
    categories: state.categories.filter(p => p.id !== id)
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

/* Selectors */
function base(state) {
  return state.categories.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getCategories(state) {
  return base(state).categories;
}

export function getCategorieById(state, id) {
  return getCategories(state).find(s => s.id === id);
}