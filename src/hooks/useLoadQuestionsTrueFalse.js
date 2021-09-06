import { useCallback, useState } from "react";
import { Alert, Animated } from "react-native";
import { useDispatch } from "react-redux";

import nav from "../constants/nav/nav";
import strings from "../constants/strings/strings";

import * as questionsActions from "../store/actions/questions";

import cache from "../utils/cache";
import getTotalPointsMulti from "../utils/getTotalPointsMulti";
import getTotalTimeLeftTrueFalse from "../utils/getTotalTimeLeftTrueFalse";
import getNumOfTotalQuestionsTrueFalse from "../utils/getNumOfTotalQuestionsTrueFalse";

export default useLoadQuestionsTrueFalse = (
  categoryId,
  gameType,
  navigation,
  timer
) => {
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

  const maxIndexForOne = 0;
  const maxIndexForTwo = 0;
  const maxIndexForThree = 0;
  const maxIndexForFour = 0;

  const withOrWithoutTimer = timer ? "" : "NoTimer";

  /* In difference with the other type of games, we call getTotalTimeLeftTrueFalse,
     in useNextQuestionHandlerTrueFalse, because, in this type of game,
     we don't call loadQuestions on each question. */

  const lettersAnimation = () => {
    return Animated.timing(fadeAnim, {
      toValue: 1, // output
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  // Utility function
  const setQuestion = async (
    NumberQuestions,
    NumberDataBase,
    fetchQuestionsForNumber
  ) => {
    /* Here we use a different logic than the other game types! 
    Namely we work with the index to slide the next question in.
    That's why we always get the questions from the device database
    and then set the next question via the index. 
    So we don't need to set a separate NumberQuestions database with questions.
    Βut, we'll do a hack! We'll set one, just to true / false,
    because we need it in TrueFalseCategoriesScreen,
    to show if there is a game on or not.*/
    await cache.set(NumberQuestions, true);
    let questionsToPlay = null;
    const data = await cache.get(NumberDataBase);
    if (!!data) {
      questionsToPlay = data.sort((a, b) => a - b);
    }
    if (!questionsToPlay) {
      setIsLoading(true);
      await dispatch(fetchQuestionsForNumber);
      setNumOfTotalQuestions(1);
      setTotalPoints(0);
      setIsLoading(false);
      const data = await cache.get(NumberDataBase);
      //   console.log("setQuestion dispatch", data);
      questionsToPlay = data.sort((a, b) => a - b);
    }

    if (!questionsToPlay) {
      Alert.alert(
        "Πρόβλημα στο κατέβασμα των ερωτήσεων",
        "Παρακαλούμε ελέγξτε τη σύνδεσή σας.",
        [
          {
            text: "Εντάξει",
            onPress: () => navigation.navigate(nav.welcome),
          },
        ]
      );
    }

    if (questionsToPlay.length === 0) {
      setStadiumIsFinished(true);
    } else if (questionsToPlay.length > 0) {
      const savedIndex = await cache.get(`indexTrueFalse${withOrWithoutTimer}`);

      let strOfRemainQuestions = 0;
      if (categoryId == "c1") {
        strOfRemainQuestions = await cache.get(
          `${strings.numOfRemainQuestionsTrueFalseOne}${withOrWithoutTimer}`
        );
      }
      if (categoryId == "c2") {
        strOfRemainQuestions = await cache.get(
          `${strings.numOfRemainQuestionsTrueFalseTwo}${withOrWithoutTimer}`
        );
      }
      if (categoryId == "c3") {
        strOfRemainQuestions = await cache.get(
          `${strings.numOfRemainQuestionsTrueFalseThree}${withOrWithoutTimer}`
        );
      }
      if (categoryId == "c4") {
        strOfRemainQuestions = await cache.get(
          `${strings.numOfRemainQuestionsTrueFalseFour}${withOrWithoutTimer}`
        );
      }

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
        `${strings.questionsRightChoices}${withOrWithoutTimer}`,
        questionsRightChoices
      );

      if (questionsToPlay.length === 0) {
        setStadiumIsFinished(true);
        await cache.remove(NumberQuestions);
        if (categoryId == "c1") {
          await cache.remove(`totalPointsTrueFalseOne${withOrWithoutTimer}`);
        } else if (categoryId == "c2") {
          await cache.remove(`totalPointsTrueFalseTwo${withOrWithoutTimer}`);
        } else if (categoryId == "c3") {
          await cache.remove(`totalPointsTrueFalseThree${withOrWithoutTimer}`);
        } else if (categoryId == "c4") {
          await cache.remove(`totalPointsTrueFalseFour${withOrWithoutTimer}`);
        }
      }
    }
  };

  const loadQuestions = useCallback(async () => {
    setLoadQuestionsError(null);

    await getNumOfTotalQuestionsTrueFalse(
      categoryId,
      gameType,
      numOfTotalQuestions,
      setNumOfTotalQuestions,
      withOrWithoutTimer
    );

    getTotalPointsMulti(categoryId, setTotalPoints, "TrueFalse", timer);

    let NumberDataBase = "",
      NumberQuestions = "",
      fetchQuestionsForNumber = null;
    try {
      if (categoryId == "c1") {
        setQuestion(
          (NumberQuestions = `questionsTrueFalseOne${withOrWithoutTimer}`),
          (NumberDataBase = strings.localDatabaseTrueFalseOne),
          (fetchQuestionsForNumber = questionsActions.fetchQuestionsForTrueFalseOne(
            maxIndexForOne,
            timer
          ))
        );
      } else if (categoryId == "c2") {
        setQuestion(
          (NumberQuestions = `questionsTrueFalseTwo${withOrWithoutTimer}`),
          (NumberDataBase = strings.localDatabaseTrueFalseTwo),
          (fetchQuestionsForNumber = questionsActions.fetchQuestionsForTrueFalseTwo(
            maxIndexForTwo,
            timer
          ))
        );
      } else if (categoryId == "c3") {
        setQuestion(
          (NumberQuestions = `questionsTrueFalseThree${withOrWithoutTimer}`),
          (NumberDataBase = strings.localDatabaseTrueFalseThree),
          (fetchQuestionsForNumber = questionsActions.fetchQuestionsForTrueFalseThree(
            maxIndexForThree,
            timer
          ))
        );
      } else if (categoryId == "c4") {
        setQuestion(
          (NumberQuestions = `questionsTrueFalseFour${withOrWithoutTimer}`),
          (NumberDataBase = strings.localDatabaseTrueFalseFour),
          (fetchQuestionsForNumber = questionsActions.fetchQuestionsForTrueFalseFour(
            maxIndexForFour,
            timer
          ))
        );
      }
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
