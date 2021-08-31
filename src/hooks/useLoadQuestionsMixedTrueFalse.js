import { useCallback, useState } from "react";
import { Alert, Animated } from "react-native";
import { useDispatch } from "react-redux";

import navNames from "../constants/navNames/navNames";
import asyncNames from "../constants/asyncNames/asyncNames";

import * as questionsActions from "../store/actions/questions";

import cache from "../utils/cache";
import getTotalPointsMixed from "../utils/getTotalPointsMixed";
import updateNumOfTotalQuestionsMixed from "../utils/updateNumOfTotalQuestionsMixed";

export default useLoadQuestionsMixedTrueFalse = (timer, gameType) => {
  const dispatch = useDispatch();
  const [questionTitle, setQuestionTitle] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [questionSource, setQuestionSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadQuestionsError, setLoadQuestionsError] = useState(); // error initially is undefined!

  const [numOfTotalQuestions, setNumOfTotalQuestions] = useState(0);
  const [numOfRemainQuestions, setNumOfRemainQuestions] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [stadiumIsFinished, setStadiumIsFinished] = useState(false);
  const [totalPointsWithTime, setTotalPointsWithTime] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  const maxIndex = 0;

  const withOrWithoutTimer = timer ? "" : "NoTimer";

  /* In difference with the other type of games, we call ,
     in useNextQuestionHandlerTrueFalse, because, in this type of game,
     we don't call loadQuestions on each question. */

  const lettersAnimation = () => {
    return Animated.timing(fadeAnim, {
      toValue: 1, // output
      duration: 800, // duration of the animation
      useNativeDriver: false,
    }).start();
  };

  // Utility function
  const setQuestion = async (
    mixedQuestionsTrueFalseAreOn,
    mixedQuestionsTrueFalse,
    fetchQuestions
  ) => {
    /* Here we use a different logic than the other game types! 
    Namely we work with the index to slide the next question in.
    That's why we always get the questions from the device database
    and then set the next question via the index. 
    So we don't need to set a separate mixedQuestionsTrueFalseAreOn database with questions.
    Βut, we'll do a hack! We'll set one, just to true / false,
    because we need it in TrueFalseCategoriesScreen,
    to show if there is a game on or not.*/
    await cache.set(mixedQuestionsTrueFalseAreOn, true);

    let questionsToPlay = null;
    const data = await cache.get(mixedQuestionsTrueFalse);
    if (!!data) {
      questionsToPlay = data.sort((a, b) => a - b);
    }
    if (!questionsToPlay) {
      setIsLoading(true);
      await dispatch(fetchQuestions, false);
      setIsLoading(false);
      const data = await cache.get(mixedQuestionsTrueFalse);
      questionsToPlay = data.sort((a, b) => a - b);
    }

    if (!questionsToPlay) {
      Alert.alert(
        "Πρόβλημα στο κατέβασμα των ερωτήσεων",
        "Παρακαλούμε ελέγξτε τη σύνδεσή σας.",
        [
          {
            text: "Εντάξει",
            onPress: () => navigation.navigate(navNames.welcome),
          },
        ]
      );
    }

    if (questionsToPlay.length === 0) {
      setStadiumIsFinished(true);
    } else if (questionsToPlay.length > 0) {
      const savedIndex = await cache.get(asyncNames.indexTrueFalseMixed);

      const strOfRemainQuestions = await cache.get(
        asyncNames.numOfRemainQuestionsTrueFalseMixed
      );

      if (strOfRemainQuestions !== null) {
        setNumOfRemainQuestions(strOfRemainQuestions);
      } else if (!!savedIndex) {
        const remainQuestions = questionsToPlay.slice(savedIndex);
        setNumOfRemainQuestions(remainQuestions.length);
      } else {
        setNumOfRemainQuestions(questionsToPlay.length - 1);
      }

      lettersAnimation(); // start the fadeIn animation

      const questTitle = questionsToPlay.map((question) => question.title);
      setQuestionTitle(questTitle);

      const questAnswer = questionsToPlay.map((question) => question.answer);
      setQuestionAnswer(questAnswer);

      const questSource = questionsToPlay.map((question) => question.source);
      setQuestionSource(questSource);

      const questionsRightChoices = questionsToPlay.map(
        (question) => question.right_choice
      );

      await cache.set(
        `${asyncNames.questionsRightChoices}${withOrWithoutTimer}`,
        questionsRightChoices
      );

      if (questionsToPlay.length === 0) {
        setStadiumIsFinished(true);
        await cache.remove(mixedQuestionsTrueFalseAreOn);
        await cache.remove(mixedQuestionsTrueFalse);
      }
    }
  };

  const loadQuestions = useCallback(async () => {
    try {
      // Check if a game is on!
      if (timer) {
        const mixGameIsOn = await cache.get(asyncNames.mixGameIsOnTrueFalse);
        !mixGameIsOn &&
          (await cache.set(asyncNames.mixGameIsOnTrueFalse, true));
      } else {
        const mixGameIsOn = await cache.get(
          asyncNames.mixGameIsOnTrueFalseNoTimer
        );
        !mixGameIsOn &&
          (await cache.set(asyncNames.mixGameIsOnTrueFalseNoTimer, true));
      }

      setLoadQuestionsError(null);

      await updateNumOfTotalQuestionsMixed(
        gameType,
        numOfTotalQuestions,
        setNumOfTotalQuestions
      );

      getTotalPointsMixed(totalPoints, setTotalPoints, gameType);

      let mixedQuestionsTrueFalseAreOn = null,
        mixedQuestionsTrueFalse = null,
        fetchQuestions = null;

      setQuestion(
        (mixedQuestionsTrueFalseAreOn =
          asyncNames.mixedQuestionsAreOnTrueFalse),
        (mixedQuestionsTrueFalse = asyncNames.questionsTrueFalseMixed),
        (fetchQuestions = questionsActions.fetchQuestionsTrueFalseMixed(
          maxIndex
        ))
      );
    } catch (err) {
      console.log(err);
      setLoadQuestionsError(err.message);
    }
  }, [dispatch, setLoadQuestionsError]);

  return {
    loadQuestions,
    loadQuestionsError,
    isLoading,
    questionTitle,
    questionAnswer,
    questionSource,
    fadeAnim,
    totalPointsWithTime,
    setTotalPointsWithTime,
    stadiumIsFinished,
    setStadiumIsFinished,
    totalPoints,
    setTotalPoints,
    numOfTotalQuestions,
    numOfRemainQuestions,
    setNumOfRemainQuestions,
    setNumOfTotalQuestions,
  };
};
