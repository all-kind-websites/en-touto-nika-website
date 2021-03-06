import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Animated } from "react-native";

import strings from "../constants/strings/strings";

import * as questionsActions from "../store/actions/questions";

import cache from "../utils/cache";
import getTotalPointsMulti from "../utils/getTotalPointsMulti";
import nav from "../constants/nav/nav";

export default useLoadQuestionsMultiple = (
  categoryId,
  navigation,
  withTimer
) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loadQuestionsError, setLoadQuestionsError] = useState(); // error initially is undefined!
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [numOfDownloadedQuestions, setNumOfDownloadedQuestions] = useState(0); // for each stadium
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [numOfQuestions, setNumOfQuestions] = useState(1); // for every round
  const [numOfTotalQuestions, setNumOfTotalQuestions] = useState(0); // for each stadium
  const [totalPoints, setTotalPoints] = useState(0);
  const [stadiumIsFinished, setStadiumIsFinished] = useState(false);
  const [totalPointsWithTime, setTotalPointsWithTime] = useState(0);

  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

  const maxIndexForOne = 0;
  const maxIndexForTwo = 0;
  const maxIndexForThree = 0;
  const maxIndexForFour = 0;

  const lettersAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // output
      duration: 800, // duration of the animation
      useNativeDriver: false,
    }).start();
  };

  const getTotalTimeLeft = async () => {
    let totalTimeLeft_Str = "";
    if (categoryId == "c1") {
      totalTimeLeft_Str = await cache.get(strings.totalTimeLeftMultiOne);
    } else if (categoryId == "c2") {
      totalTimeLeft_Str = await cache.get(strings.totalTimeLeftMultiTwo);
    } else if (categoryId == "c3") {
      totalTimeLeft_Str = await cache.get(strings.totalTimeLeftMultiThree);
    } else if (categoryId == "c4") {
      totalTimeLeft_Str = await cache.get(strings.totalTimeLeftMultiFour);
    }
    let totalTimeLeft_Int = totalTimeLeft_Str;
    if (isNaN(totalTimeLeft_Int)) {
      totalTimeLeft_Int = 0;
    }
    setTotalTimeLeft(totalTimeLeft_Int);
  };

  // Utility function
  const setQuestion = async (
    NumberDataBase,
    NumberQuestions,
    fetchQuestionsForNumber
  ) => {
    let questions = null;
    // Get questions of current game.
    questions = await cache.get(NumberQuestions);
    // console.log("questions 1", questions);

    // If new game, check if questions are saved in device storage.
    // console.log("NumberDataBase", NumberDataBase);
    if (!questions) {
      questions = await cache.get(NumberDataBase);
      setNumOfTotalQuestions(0);
      setNumOfQuestions(1);
      setTotalPoints(0);
    }
    // console.log("questions 2", !!questions);
    // Else fetch the questions and store them to cache
    if (!questions) {
      // console.log("dispatch");
      setIsLoading(true);
      await dispatch(fetchQuestionsForNumber);
      setIsLoading(false);
      questions = await cache.get(NumberQuestions);
    }
    // console.log("questions 3", !!questions);

    if (!questions) {
      Alert.alert(
        "???????????????? ?????? ?????????????????? ?????? ??????????????????",
        "?????????????????????? ?????????????? ???? ?????????????? ??????.",
        [
          {
            text: "??????????????",
            onPress: () => navigation.navigate(nav.welcome),
          },
        ]
      );
    }

    if (questions) {
      setNumOfDownloadedQuestions(questions.length);
      if (questions.length === 0) {
        setSelectedQuestion(null);
        setStadiumIsFinished(true);
      } else if (questions.length > 0) {
        const shuffledquestions = shuffle(questions);
        const newSelectedQuestion = shuffledquestions.splice(0, 1);

        // Remove the old set and save the new one with one less question
        await cache.remove(NumberQuestions);

        // If there is a question store it...
        if (questions.length > 0 || newSelectedQuestion.length === 1) {
          await cache.set(NumberQuestions, questions);
          lettersAnimation(); // start dim-in letters animation
          setSelectedQuestion(newSelectedQuestion.pop());
        } else if (questions.length === 0 || newSelectedQuestion.length === 0) {
          setStadiumIsFinished(true);
          await cache.remove(NumberQuestions);
          if (withTimer) {
            if (categoryId == "c1") {
              await cache.remove(strings.numOfTotQuestionsMultiOne);
            } else if (categoryId == "c2") {
              await cache.remove(strings.numOfTotQuestionsMultiTwo);
            } else if (categoryId == "c3") {
              await cache.remove(strings.numOfTotQuestionsMultiThree);
            } else if (categoryId == "c4") {
              await cache.remove(strings.numOfTotQuestionsMultiFour);
            }
          } else {
            if (categoryId == "c1") {
              await cache.remove(strings.numOfTotQuestionsMultiOneNoTimer);
            } else if (categoryId == "c2") {
              await cache.remove(strings.numOfTotQuestionsMultiTwoNoTimer);
            } else if (categoryId == "c3") {
              await cache.remove(strings.numOfTotQuestionsMultiThreeNoTimer);
            } else if (categoryId == "c4") {
              await cache.remove(strings.numOfTotQuestionsMultiFourNoTimer);
            }
          }
        }
      }
    }
  };

  const loadQuestions = useCallback(async () => {
    setLoadQuestionsError(null);
    // Get the numOfTotalQuestions initially
    let savedNumOfTotQuestions = 0;
    if (withTimer) {
      if (categoryId == "c1") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiOne
        );
      } else if (categoryId == "c2") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiTwo
        );
      } else if (categoryId == "c3") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiThree
        );
      } else if (categoryId == "c4") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiFour
        );
      }
    } else {
      if (categoryId == "c1") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiOneNoTimer
        );
      } else if (categoryId == "c2") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiTwoNoTimer
        );
      } else if (categoryId == "c3") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiThreeNoTimer
        );
      } else if (categoryId == "c4") {
        savedNumOfTotQuestions = await cache.get(
          strings.numOfTotQuestionsMultiFourNoTimer
        );
      }
    }

    if (savedNumOfTotQuestions) {
      setNumOfTotalQuestions(+savedNumOfTotQuestions + 1);
    } else {
      setNumOfTotalQuestions(+numOfTotalQuestions + 1);
    }

    getTotalPointsMulti(categoryId, setTotalPoints, "Multi", withTimer);
    withTimer && getTotalTimeLeft();

    let noTimer = "",
      NumberDataBase = null,
      NumberQuestions = null,
      fetchQuestionsForNumber = null;
    if (!withTimer) noTimer = "NoTimer";
    try {
      if (categoryId == "c1") {
        setQuestion(
          (NumberDataBase = strings.localDataBaseMultiOne),
          (NumberQuestions = strings.questionsMultiOne + noTimer),
          (fetchQuestionsForNumber = withTimer
            ? questionsActions.fetchQuestionsForMultiOne(maxIndexForOne)
            : questionsActions.fetchQuestionsForMultiOneNoTimer(maxIndexForOne))
        );
      } else if (categoryId == "c2") {
        setQuestion(
          (NumberDataBase = strings.localDataBaseMultiTwo),
          (NumberQuestions = strings.questionsMultiTwo + noTimer),
          (fetchQuestionsForNumber = withTimer
            ? questionsActions.fetchQuestionsForMultiTwo(maxIndexForTwo)
            : questionsActions.fetchQuestionsForMultiTwoNoTimer(maxIndexForTwo))
        );
      } else if (categoryId == "c3") {
        setQuestion(
          (NumberDataBase = strings.localDataBaseMultiThree),
          (NumberQuestions = strings.questionsMultiThree + noTimer),
          (fetchQuestionsForNumber = withTimer
            ? questionsActions.fetchQuestionsForMultiThree(maxIndexForThree)
            : questionsActions.fetchQuestionsForMultiThreeNoTimer(
                maxIndexForThree
              ))
        );
      } else if (categoryId == "c4") {
        setQuestion(
          (NumberDataBase = strings.localDataBaseMultiFour),
          (NumberQuestions = strings.questionsMultiFour + noTimer),
          (fetchQuestionsForNumber = withTimer
            ? questionsActions.fetchQuestionsForMultiFour(maxIndexForThree)
            : questionsActions.fetchQuestionsForMultiFourNoTimer(
                maxIndexForThree
              ))
        );
      }
    } catch (err) {
      console.log(err);
      setLoadQuestionsError(err.message);
    }
  }, [setLoadQuestionsError]);

  return {
    isLoading,
    fadeAnim,
    lettersAnimation,
    loadQuestions,
    loadQuestionsError,
    numOfDownloadedQuestions,
    numOfQuestions,
    numOfTotalQuestions,
    selectedQuestion,
    setFadeAnim,
    setLoadQuestionsError,
    setNumOfDownloadedQuestions,
    setNumOfQuestions,
    setNumOfTotalQuestions,
    setStadiumIsFinished,
    setTotalPoints,
    setTotalTimeLeft,
    stadiumIsFinished,
    totalPoints,
    totalTimeLeft,
    totalPointsWithTime,
    setTotalPointsWithTime,
  };
};
