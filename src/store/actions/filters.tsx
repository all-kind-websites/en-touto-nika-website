import strings from "../../constants/strings";
// import cache from "../../utils/cache";
import { store } from "../configureStore";

export const UPLOAD_CATEGORIES_FILTERS = "UPLOAD_CATEGORIES_FILTERS";
export const DELETE_PREVIOUS_CATEGORIES_FILTERS =
  "DELETE_PREVIOUS_CATEGORIES_FILTERS";
export const FETCH_CATEGORIES_FILTERS = "FETCH_CATEGORIES_FILTERS";

export interface AppliedFilters {
  one: boolean,
  two: boolean,
  three: boolean,
  four: boolean,
  filtersAreApplied: boolean,
};

export const uploadCategoriesFilters = (gameType: string, appliedCategoriesFilters: AppliedFilters) => {
  return async (dispatch: Function) => {
    try {

      const { userId, token } = store.getState().auth;

      const response = await fetch(
        `https://en-touto-nika.firebaseio.com//categoriesFilters${gameType}/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appliedCategoriesFilters,
          }),
        }
      );

      // Set the filters to get them in ApanthismaScreen to initialize
      // Categories with previous chosen - saved filters.
      await localStorage.setItem(
        strings.categoriesFilters,
        JSON.stringify({
          appliedCategoriesFilters,
        })
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η αποθήκευση των κατηγοριών δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }

      dispatch({
        type: UPLOAD_CATEGORIES_FILTERS,
        appliedCategoriesFilters: appliedCategoriesFilters,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deletePreviousCategoriesFilters = (gameType: string) => {
  return async (dispatch: Function) => {
    try {
      const { userId, token } = store.getState().auth;

      const response = await fetch(
        `https://en-touto-nika.firebaseio.com/categoriesFilters${gameType}/${userId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Δυστυχώς η αλλαγή της κατάστασης της κατηγορίας δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      // This action is not need!
      dispatch({ type: DELETE_PREVIOUS_CATEGORIES_FILTERS });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};

export const fetchCategoriesFilters = (gameType: string) => {
  return async (dispatch: Function) => {
    try {
      const { userId } = store.getState().auth;

      const filtersResponse = await fetch(
        `https://en-touto-nika.firebaseio.com/categoriesFilters${gameType}/${userId}.json`
      );

      // check before unpack the filtersResponse body
      if (!filtersResponse.ok) {
        throw new Error(
          "Δυστυχώς η φόρτωση της κατάστασης των κατηγοριών δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας."
        );
      }
      const filtersResData = await filtersResponse.json();

      let appliedCategoriesFilters = [];
      if (!!filtersResData) {
        for (const key in filtersResData) {
          appliedCategoriesFilters =
            filtersResData[key].appliedCategoriesFilters;
        }
      }
      await localStorage.setItem(
        strings.categoriesFilters,
        JSON.stringify({ appliedCategoriesFilters })
      );

      dispatch({
        type: FETCH_CATEGORIES_FILTERS,
        appliedCategoriesFilters: appliedCategoriesFilters,
      });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      alert("Δυστυχώς η φόρτωση της κατάστασης των κατηγοριών δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.");

      throw err;
    }
  };
};
