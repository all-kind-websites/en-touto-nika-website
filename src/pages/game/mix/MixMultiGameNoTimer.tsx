import '../../../styles/game/mix/mix-multi-game-no-timer.scss'

import { useState, useEffect, useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import strings from "../../../constants/strings";

import useLoadQuestionsMixMulti from "../../../hooks/useLoadQuestionsMixMulti";
import useSaveStadiumResultHandler from "../../../hooks/useSaveStadiumResultHandler";

import showQuestion from "../../../components/game/showQuestion";

import quitGame from "../../../utils/quitGame";
import { removeChoicesfromAsyncStorage } from "../../../utils/removeAsync";
import checkAnswerHandlerMixMulti from "../../../utils/checkAnswerHandlerMixMulti";

import GameOverPage from "../../extras/GameOverPage";
import DownloadErrorScreen from "../../extras/DownloadErrorScreen";
import NoQuestionsHereScreen from '../../extras/NoQuestionsHereScreen';
import { savePoints } from '../../../store/actions/game';
import { useHistory } from 'react-router-dom';
import nav from '../../../constants/nav';

const MixMultiGameNoTimer = (props: any) => {
  const dispatch = useDispatch();
  const history: any = useHistory();

  const [modalVisible, setModalVisible] = useState(false);

  const pointsMultiMixed = useSelector((state: RootStateOrAny) => state.game.pointsMultiMixed);
  const userIsLogedIn = useSelector((state: RootStateOrAny) => state.auth.userId);
  const email = useSelector((state: RootStateOrAny) => state.auth.email);
  const gameType = useSelector((state: RootStateOrAny) => state.game.id);

  const [refreshing, setRefreshing] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const [choiceSave, setChoiceSave] = useState(false);
  const [correctChoice, setCorrectChoice] = useState(false);
  const [choiceColor, setChoiceColor] = useState(strings.defaultChoiceColor);

  const [checkAlfa, setCheckAlfa] = useState(false);
  const [checkBeta, setCheckBeta] = useState(false);
  const [checkGamma, setCheckGamma] = useState(false);
  const [checkDelta, setCheckDelta] = useState(false);

  const [stadiumCounter, setStadiumCounter] = useState(1);

  let timer = false;

  // By this we know in TopMenu, which points to display.
  useEffect(() => {
    dispatch(savePoints(pointsMultiMixed, strings.pointsTypeMultiMixed))
  }, [dispatch, pointsMultiMixed])

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
    setChoiceColor(strings.defaultChoiceColor)
    setRefreshing(true);
    setCheckAlfa(false);
    setCheckBeta(false);
    setCheckGamma(false);
    setCheckDelta(false);
    setChoiceSave(false);
    setChoiceSave(false);
    await removeChoicesfromAsyncStorage();
    setNumOfQuestions(numOfQuestions + 1);
    // Then
    loadQuestions();
    setShowAnswer(false);
    setRefreshing(false);

    // set num of q/s to finish stadium (100)
    if (numOfTotalQuestions === 100) {
      setStadiumIsFinished(true);
    }
  }, [setRefreshing, loadQuestions, numOfQuestions, numOfTotalQuestions, setNumOfQuestions, setStadiumIsFinished,]);

  const { quit } = quitGame(
    history,
    setNumOfTotalQuestions,
    gameType,
    timer,
    // * check below
    "MultiMixed"
  );
  /* In games that are not mixed, we use categoryId at the end.
      Here we hardcode MultiMixed.  */

  const { isUpLoading, saveStadiumResult } = useSaveStadiumResultHandler(
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
  }, []); // leave the dependencies there and empty


  const { saveAnswer } = checkAnswerHandlerMixMulti(
    selectedQuestion,
    setChoiceColor,
    setCorrectChoice,
    setTotalPoints,
    totalPoints
  );

  if (loadQuestionsError) {
    return (
      <DownloadErrorScreen
        loadQuestions={loadQuestions}
        history={props.history}
      />
    );
  }

  if (numOfQuestions === 1 && selectedQuestion === null) {
    return (
      <NoQuestionsHereScreen history={props.history} />
    );
  }

  if (stadiumIsFinished) {
    return (
      <GameOverPage
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
    <article className='mix-multi' >
      {showQuestion(
        strings.alfaIsTrueMultiMixed,
        strings.betaIsTrueMultiMixed,
        strings.gammaIsTrueMultiMixed,
        strings.deltaIsTrueMultiMixed,
        checkAlfa,
        checkBeta,
        categoryId,
        gameType,
        checkGamma,
        checkDelta,
        choiceColor,
        choiceSave,
        correctChoice,
        saveAnswer,
        showAnswer,
        numOfDownloadedQuestions,
        numOfTotalQuestions,
        onRefresh,
        selectedQuestion,
        quit,
        setCheckAlfa,
        setCheckBeta,
        setCheckGamma,
        setCheckDelta,
        setChoiceSave,
        setNumOfTotalQuestions,
        setShowAnswer,
        setStadiumIsFinished,
        timer,
        totalPoints,
        modalVisible,
      )}
    </article>
  );
};


export default MixMultiGameNoTimer;

