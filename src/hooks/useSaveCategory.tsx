import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as filtersActions from "../store/actions/filters";
import useGetQuestionsList from "./useGetQuestionsList";
import cache from "../utils/cache";
import asyncNames from "../constants/asyncNames";

const useSaveCategory = (gameType: string) => {
  const dispatch = useDispatch();
  // They run when a checkbox is touched
  const [oneIsTrue, setOneIsTrue] = useState(false);
  const [twoIsTrue, setTwoIsTrue] = useState(false);
  const [threeIsTrue, setThreeIsTrue] = useState(false);
  const [fourIsTrue, setFourIsTrue] = useState(false);

  // For checking if we have filters on the server so we set their state from there...
  const [filtersAreApplied, setFiltersAreApplied] = useState(false);

  // Gets updated everytime we set a filter, so we delete their previous state
  const [deleteFilters, setDeleteFilters] = useState(false);

  const { categoryIsChosen, isLoading } = useGetQuestionsList(
    oneIsTrue,
    twoIsTrue,
    threeIsTrue,
    fourIsTrue,
    gameType
  );

  const loadFilters = useCallback(async () => {
    // We set 'categoriesFilters' in store/actions in uploadCategoriesFilters function
    const savedFilters = await cache.get(asyncNames.categoriesFilters);
    // const savedFilters = JSON.parse(categoriesFilters);

    let applySavedFilters = false;
    for (const key in savedFilters) {
      applySavedFilters = savedFilters[key].filtersAreApplied;
      // If we have savedFilters and we didn't press a checkbox then...
      if (applySavedFilters && !deleteFilters) {
        setOneIsTrue(savedFilters[key].one);
        setTwoIsTrue(savedFilters[key].two);
        setThreeIsTrue(savedFilters[key].three);
        setFourIsTrue(savedFilters[key].four);
      }
    }

    // Get state of filters to send them to server
    const appliedFilters = {
      one: oneIsTrue,
      two: twoIsTrue,
      three: threeIsTrue,
      four: fourIsTrue,
      filtersAreApplied: filtersAreApplied,
    };

    // If a checkbox is touched then 'deleteFilters' will be true.
    if (deleteFilters) {
      await dispatch(filtersActions.deletePreviousCategoriesFilters(gameType));
      await dispatch(
        filtersActions.uploadCategoriesFilters(gameType, appliedFilters)
      );
    }
  }, [
    oneIsTrue,
    twoIsTrue,
    threeIsTrue,
    fourIsTrue,
    setOneIsTrue,
    setTwoIsTrue,
    setThreeIsTrue,
    setFourIsTrue,
    deleteFilters,
    filtersAreApplied,
    dispatch,
    gameType
  ]);

  // loadFilters after focusing
  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  // loadFilters initially...
  useEffect(() => {
    const getFilters = async () => {
      await dispatch(filtersActions.fetchCategoriesFilters(gameType));
      loadFilters();
    };
    getFilters();
  }, [loadFilters, dispatch, gameType]);

  const saveOne = () => {
    setOneIsTrue(!oneIsTrue);
    setDeleteFilters(true);
    setFiltersAreApplied(true);
  };
  const saveTwo = () => {
    setTwoIsTrue(!twoIsTrue);
    setDeleteFilters(true);
    setFiltersAreApplied(true);
  };
  const saveThree = () => {
    setThreeIsTrue(!threeIsTrue);
    setDeleteFilters(true);
    setFiltersAreApplied(true);
  };
  const saveFour = () => {
    setFourIsTrue(!fourIsTrue);
    setDeleteFilters(true);
    setFiltersAreApplied(true);
  };
  return {
    oneIsTrue,
    twoIsTrue,
    threeIsTrue,
    fourIsTrue,
    saveOne,
    saveTwo,
    saveThree,
    saveFour,
    categoryIsChosen,
    isLoading,
  };
};

export default useSaveCategory;
