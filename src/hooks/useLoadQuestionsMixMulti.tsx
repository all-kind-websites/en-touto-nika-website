import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import asyncNames from "../constants/asyncNames";

import * as questionsActions from "../store/actions/questions";

import cache from "../utils/cache";
import getTotalPointsMixed from "../utils/getTotalPointsMixed";
import getTotalTimeLeft from "../utils/getTotalTimeLeftTrueFalse";
import updateNumOfTotalQuestionsMixed from "../utils/updateNumOfTotalQuestionsMixed";

const useLoadQuestionsMixedMulti = (timer: boolean, gameType: string) => {
  const dispatch = useDispatch();
  const [loadQuestionsError, setLoadQuestionsError] = useState(null); // error initially is undefined!
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [numOfQuestions, setNumOfQuestions] = useState(1); // for every round
  const [numOfTotalQuestions, setNumOfTotalQuestions] = useState(0); // for each stadium
  const [numOfDownloadedQuestions, setNumOfDownloadedQuestions] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [stadiumIsFinished, setStadiumIsFinished] = useState(false);
  const [totalPointsWithTime, setTotalPointsWithTime] = useState(0);






  const loadQuestions = useCallback(async () => {
    const getTotalTimeLeft = async () => {
      if (timer) {
        let totalTimeLeft = await cache.get(asyncNames.totalTimeLeftMultiMixed);
        if (!totalTimeLeft) totalTimeLeft = 0;
        else setTotalTimeLeft(parseInt(totalTimeLeft));
      }
    }


    try {
      if (timer) {
        const mixGameIsOn = await cache.get(asyncNames.mixGameIsOnMulti);
        !mixGameIsOn && (await cache.set(asyncNames.mixGameIsOnMulti, true));
      } else {
        const mixGameIsOn = await cache.get(asyncNames.mixGameIsOnMultiNoTimer);
        !mixGameIsOn &&
          (await cache.set(asyncNames.mixGameIsOnMultiNoTimer, true));
      }

      setLoadQuestionsError(null);

      updateNumOfTotalQuestionsMixed(
        gameType,
        numOfTotalQuestions,
        setNumOfTotalQuestions
      );

      getTotalPointsMixed(totalPoints, setTotalPoints, gameType);

      timer && getTotalTimeLeft();

      let questions = await cache.get(asyncNames.questionsMultiMixed);

      // In case game just starts we fetch the questions and store them to AsyncStorage
      if (!questions) {
        setNumOfTotalQuestions(0);
        setNumOfQuestions(1);
        setTotalPoints(0);
        if (timer) {
          await cache.remove(asyncNames.min);
          await cache.remove(asyncNames.sec);
        }

        await dispatch(
          questionsActions.fetchQuestionsMultiMixed()
        );
        questions = await cache.get(asyncNames.questionsMultiMixed);
      }

      if (questions) {
        setNumOfDownloadedQuestions(questions.length);

        // Remove the old set and save the new one with one less question
        const newSelectedQuestion = questions.splice(0, 1);
        await cache.remove(asyncNames.questionsMultiMixed);

        // If there is a question store it...
        if (questions.length > 0 || newSelectedQuestion.length === 1) {
          await cache.set(asyncNames.questionsMultiMixed, questions);
          setSelectedQuestion(newSelectedQuestion.pop());
        } else if (questions.length === 0 || newSelectedQuestion.length === 0) {
          setStadiumIsFinished(true);
          await cache.remove(asyncNames.numOfTotQuestionsMultiMixed);
          await cache.remove(asyncNames.questionsMultiMixed);
        }
      }
    } catch (err) {
      console.log(err);
      setLoadQuestionsError(err.message);
    }
  }, [dispatch, gameType, getTotalTimeLeft, numOfTotalQuestions, timer, totalPoints]);

  return {
    loadQuestions,
    loadQuestionsError,
    numOfDownloadedQuestions,
    numOfQuestions,
    numOfTotalQuestions,
    selectedQuestion,
    setNumOfQuestions,
    setNumOfTotalQuestions,
    setStadiumIsFinished,
    setTotalPoints,
    stadiumIsFinished,
    totalPoints,
  };
};

export default useLoadQuestionsMixedMulti;