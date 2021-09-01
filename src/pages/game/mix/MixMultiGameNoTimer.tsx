import '../../../styles/game/mix/mix-multi-game-no-timer.scss'

import { useState, useEffect, useCallback } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

import asyncNames from "../../../constants/asyncNames";

import useLoadQuestionsMixMulti from "../../../hooks/useLoadQuestionsMixMulti";
import useSaveStadiumResultHandler from "../../../hooks/useSaveStadiumResultHandler";

import showQuestion from "../../../components/game/showQuestion";

import quitGame from "../../../utils/quitGame";
import { removeChoicesfromAsyncStorage } from "../../../utils/removeAsync";
import checkAnswerHandlerMixMulti from "../../../utils/checkAnswerHandlerMixMulti";

import GameOverScreen from "../../extras/GameOverScreen";
import DownloadErrorScreen from "../../extras/DownloadErrorScreen";
import NoQuestionsHereScreen from '../../extras/NoQuestionsHereScreen';

const MixMultiGameNoTimer = () => {
  const userIsLogedIn = useSelector((state: RootStateOrAny) => state.auth.userId);
  const email = useSelector((state: RootStateOrAny) => state.auth.email);
  const gameType = useSelector((state: RootStateOrAny) => state.game.id);

  const [isUpLoading, setIsUpLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const [choiceSave, setChoiceSave] = useState(false);
  const [correctChoice, setCorrectChoice] = useState(false);
  const [playCorrectAnimSound, setPlayCorrectAnimSound] = useState(false);
  const [playWrongAnimSound, setPlayWrongAnimSound] = useState(false);

  const [alfaStyle, setAlfaStyle] = useState(false);
  const [betaStyle, setBetaStyle] = useState(false);
  const [gammaStyle, setGammaStyle] = useState(false);
  const [deltaStyle, setDeltaStyle] = useState(false);

  const [stadiumCounter, setStadiumCounter] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);

  let timer = false;

  const {
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
  } = useLoadQuestionsMixMulti(timer, gameType);

  const onRefresh = useCallback(async () => {
    setCorrectChoice(false);
    setRefreshing(true);
    setChoiceSave(false);
    removeChoicesfromAsyncStorage();
    setNumOfQuestions(numOfQuestions + 1);
    // Then
    loadQuestions();
    setShowAnswer(false);
    setRefreshing(false);
    setAlfaStyle(false);
    setBetaStyle(false);
    setGammaStyle(false);
    setDeltaStyle(false);

    // set num of q/s to finish stadium (100)
    if (numOfTotalQuestions === 100) {
      setStadiumIsFinished(true);
    }
  }, [setRefreshing, loadQuestions, numOfQuestions, numOfTotalQuestions, setNumOfQuestions, setStadiumIsFinished,]);

  const { quit } = quitGame(
    setNumOfTotalQuestions,
    gameType,
    timer,
    // * check below
    "MultiMixed"
  );
  /* In games that are not mixed, we use categoryId at the end.
      Here we hardcode MultiMixed.  */

  const { saveStadiumResult } = useSaveStadiumResultHandler(
    totalPoints,
    email,
    userIsLogedIn,
    gameType,
    timer,
    quit,
    "MultiMixed"
  );

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);


  const { saveAnswer } = checkAnswerHandlerMixMulti(
    selectedQuestion,
    setCorrectChoice,
    setModalVisible,
    setPlayCorrectAnimSound,
    setPlayWrongAnimSound,
    setTotalPoints,
    totalPoints
  );

  if (loadQuestionsError) {
    return (
      <DownloadErrorScreen
        loadQuestions={loadQuestions}
      />
    );
  }

  if (numOfQuestions === 1 && selectedQuestion === null) {
    return (
      <NoQuestionsHereScreen />
    );
  }

  if (stadiumIsFinished) {
    return (
      <GameOverScreen
        timer={timer}
        isUpLoading={isUpLoading}
        saveStadiumResult={saveStadiumResult}
        stadiumCounter={stadiumCounter}
        totalPoints={totalPoints}
      />
    );
  }

  const categoryId = false;
  return (
    <article>
      {showQuestion(
        asyncNames.alfaIsTrueMultiMixed,
        asyncNames.betaIsTrueMultiMixed,
        asyncNames.gammaIsTrueMultiMixed,
        asyncNames.deltaIsTrueMultiMixed,
        categoryId,
        gameType,
        choiceSave,
        correctChoice,
        onRefresh,
        refreshing,
        saveAnswer,
        showAnswer,
        numOfDownloadedQuestions,
        numOfTotalQuestions,
        selectedQuestion,
        quit,
        setChoiceSave,
        setNumOfTotalQuestions,
        setShowAnswer,
        setStadiumIsFinished,
        timer,
        totalPoints
      )}
    </article>
  );
};


export default MixMultiGameNoTimer;

