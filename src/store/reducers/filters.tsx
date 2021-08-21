import {
  FETCH_CATEGORIES_FILTERS,
  DELETE_PREVIOUS_CATEGORIES_FILTERS,
  UPLOAD_CATEGORIES_FILTERS
} from "../actions/filters";

import { AppliedFilters } from '../actions/filters';

const initialState = {
  categoriesFilters: {}
};

const filters = (state = initialState, action: { type: string, appliedCategoriesFilters: AppliedFilters }) => {
  switch (action.type) {
    case UPLOAD_CATEGORIES_FILTERS:
      return {
        ...state,
        categoriesFilters: action.appliedCategoriesFilters
      };

    case FETCH_CATEGORIES_FILTERS:
      return {
        ...state,
        categoriesFilters: action.appliedCategoriesFilters
      };

    case DELETE_PREVIOUS_CATEGORIES_FILTERS:
      return {
        ...state,
        categoriesFilters: {}
      };
    default:
      return state; // is actually first reached when app starts
  }
};

export default filters;
