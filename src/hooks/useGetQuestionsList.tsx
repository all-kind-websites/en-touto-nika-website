import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import cache from "../utils/cache";
import * as questionsActions from "../store/actions/questions";
import asyncNames from "../constants/asyncNames";

const maxIndex = 0;

const useGetQuestionsList = (
  oneIsTrue: boolean,
  twoIsTrue: boolean,
  threeIsTrue: boolean,
  fourIsTrue: boolean,
  gameType: string
) => {
  const [categoryIsChosen, setCategoryIsChosen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const getQuestionsFromServer = useCallback(async (category: string) => {
    let action;
    if (gameType === "Multi") {
      if (category === "check_one")
        action = questionsActions.fetchQuestionsForMixedOne(maxIndex);
      if (category === "check_two")
        action = questionsActions.fetchQuestionsForMixedTwo(maxIndex);
      if (category === "check_three")
        action = questionsActions.fetchQuestionsForMixedThree(maxIndex);
      if (category === "check_four")
        action = questionsActions.fetchQuestionsForMixedFour(maxIndex);
    } else if (gameType === "TrueFalse") {
      if (category === "check_oneTF")
        action = questionsActions.fetchQuestionsForTrueFalseOneMixed(maxIndex);
      if (category === "check_twoTF")
        action = questionsActions.fetchQuestionsForTrueFalseTwoMixed(maxIndex);
      if (category === "check_threeTF")
        action = questionsActions.fetchQuestionsForTrueFalseThreeMixed(
          maxIndex
        );
      if (category === "check_fourTF")
        action = questionsActions.fetchQuestionsForTrueFalseFourMixed(maxIndex);
    }

    setError('');
    setIsLoading(true);
    try {
      await dispatch(action);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  }
    , [dispatch, gameType]);

  const checkHandler = useCallback(async (category: string, localDatabase: string) => {
    setCategoryIsChosen(true);
    // Save status of checkbox in AsyncStorage.
    await cache.set(category, true);
    // Try to get questions from AsyncStorage.
    const localDB = await cache.get(localDatabase);
    !localDB && getQuestionsFromServer(category);
  }, [getQuestionsFromServer])

  useEffect(() => {
    if (gameType === "Multi") {
      if (oneIsTrue)
        checkHandler("check_one", asyncNames.localDataBaseMultiMixedOne);
      if (!oneIsTrue) (async () => await cache.remove("check_one"))();
      if (twoIsTrue)
        checkHandler("check_two", asyncNames.localDataBaseMultiMixedTwo);
      if (!twoIsTrue) (async () => await cache.remove("check_two"))();
      if (threeIsTrue)
        checkHandler("check_three", asyncNames.localDataBaseMultiMixedThree);
      if (!threeIsTrue) (async () => await cache.remove("check_three"))();
      if (fourIsTrue)
        checkHandler("check_four", asyncNames.localDataBaseMultiMixedFour);
      if (!fourIsTrue) (async () => await cache.remove("check_four"))();
    } else if (gameType === "TrueFalse") {
      if (oneIsTrue)
        checkHandler("check_oneTF", asyncNames.localDatabaseTrueFalseMixedOne);
      if (!oneIsTrue) (async () => await cache.remove("check_oneTF"))();
      if (twoIsTrue)
        checkHandler("check_twoTF", asyncNames.localDatabaseTrueFalseMixedTwo);
      if (!twoIsTrue) (async () => await cache.remove("check_twoTF"))();
      if (threeIsTrue)
        checkHandler(
          "check_threeTF",
          asyncNames.localDatabaseTrueFalseMixedThree
        );
      if (!threeIsTrue) (async () => await cache.remove("check_threeTF"))();
      if (fourIsTrue)
        checkHandler(
          "check_fourTF",
          asyncNames.localDatabaseTrueFalseMixedFour
        );
      if (!fourIsTrue) (async () => await cache.remove("check_fourTF"))();
    }
  }, [oneIsTrue, twoIsTrue, threeIsTrue, fourIsTrue, gameType, checkHandler]);

  return {
    categoryIsChosen,
    isLoading,
  };
};

export default useGetQuestionsList;
