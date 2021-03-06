import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import strings from "../constants/strings";

import * as questionsActions from "../store/actions/questions";

import cache from "../utils/cache";
import getTotalPointsMixed from "../utils/getTotalPointsMixed";
// import getTotalTimeLeft from "../utils/getTotalTimeLeftTrueFalse";
import updateNumOfTotalQuestionsMixed from "../utils/updateNumOfTotalQuestionsMixed";

const useLoadQuestionsMixedMulti = (timer: boolean, gameType: string) => {
  const dispatch = useDispatch();
  const [loadQuestionsError, setLoadQuestionsError] = useState(null); // error initially is undefined!
  // const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [numOfTotalQuestions, setNumOfTotalQuestions] = useState(0); // for each stadium
  const [numOfDownloadedQuestions, setNumOfDownloadedQuestions] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [stadiumIsFinished, setStadiumIsFinished] = useState(false);


  const loadQuestions = useCallback(async () => {
    // const getTotalTimeLeft = async () => {
    //   if (timer) {
    //     let totalTimeLeft = await cache.get(strings.totalTimeLeftMultiMixed);
    //     if (!totalTimeLeft) totalTimeLeft = 0;
    //     else setTotalTimeLeft(parseInt(totalTimeLeft));
    //   }
    // }


    try {
      if (timer) {
        const mixGameIsOn = await cache.get(strings.mixGameIsOnMulti);
        !mixGameIsOn && (await cache.set(strings.mixGameIsOnMulti, true));
      } else {
        const mixGameIsOn = await cache.get(strings.mixGameIsOnMultiNoTimer);
        !mixGameIsOn && (await cache.set(strings.mixGameIsOnMultiNoTimer, true));
      }

      setLoadQuestionsError(null);

      updateNumOfTotalQuestionsMixed(
        gameType,
        numOfTotalQuestions,
        setNumOfTotalQuestions
      );

      getTotalPointsMixed(totalPoints, setTotalPoints, gameType);

      // timer && getTotalTimeLeft();

      let questions = await cache.get(strings.questionsMultiMixed);

      // In case game just starts we fetch the questions and store them to AsyncStorage
      if (!questions) {
        setNumOfTotalQuestions(1);
        setTotalPoints(0);
        if (timer) {
          await cache.remove(strings.min);
          await cache.remove(strings.sec);
        }

        await dispatch(
          questionsActions.fetchQuestionsMultiMixed()
        );
        questions = await cache.get(strings.questionsMultiMixed);
      }

      if (questions) {
        setNumOfDownloadedQuestions(questions.length);

        // Remove the old set and save the new one with one less question
        const newSelectedQuestion = questions.splice(0, 1);
        await cache.remove(strings.questionsMultiMixed);

        // If there is a question store it...
        if (questions.length > 0 || newSelectedQuestion.length === 1) {
          await cache.set(strings.questionsMultiMixed, questions);
          setSelectedQuestion(newSelectedQuestion.pop());
        } else if (questions.length === 0 || newSelectedQuestion.length === 0) {
          setStadiumIsFinished(true);
          await cache.remove(strings.numOfTotQuestionsMultiMixed);
          await cache.remove(strings.questionsMultiMixed);
        }
      }
    } catch (err) {
      console.log(err);
      setLoadQuestionsError(err.message);
    }
  }, [dispatch, gameType, numOfTotalQuestions, timer, totalPoints]);

  return {
    loadQuestions,
    loadQuestionsError,
    numOfDownloadedQuestions,
    numOfTotalQuestions,
    selectedQuestion,
    setNumOfTotalQuestions,
    setStadiumIsFinished,
    setTotalPoints,
    stadiumIsFinished,
    totalPoints,
  };
};

export default useLoadQuestionsMixedMulti;