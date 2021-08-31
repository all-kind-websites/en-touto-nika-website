import { useState } from "react";

import asyncNames from "../constants/asyncNames/asyncNames";

import cache from "../utils/cache";
import getTotalPointsMulti from "../utils/getTotalPointsMulti";
import updateRemainQuestionsTrueFalse from "../utils/updateRemainQuestionsTrueFalse";
import getNumOfTotalQuestionsTrueFalse from "../utils/getNumOfTotalQuestionsTrueFalse";
import updateNumOfTotalQuestionsMixed from "../utils/updateNumOfTotalQuestionsMixed";

export default useNextQuestionHandlerTrueFalse = (
  categoryId,
  gameType,
  numOfRemainQuestions,
  numOfTotalQuestions,
  setChoiceSave,
  setCorrectChoice,
  setNumOfRemainQuestions,
  setNumOfTotalQuestions,
  setPlayCorrectAnimSound,
  setPlayWrongAnimSound,
  setShowAnswer,
  setStadiumIsFinished,
  setTotalPoints,
  timer
) => {
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);

  /* In difference with the other type of games, we call getTotalTimeLeftTrueFalse,
     in nextQuestionHandler, because, in this type of game,
     we don't call loadQuestions on each question. */
  const getTotalTimeLeftTrueFalse = async () => {
    let totalTimeLeft_Str = "";
    // a mixed game is on => categoryId === undefined
    if (!categoryId) {
      totalTimeLeft_Str = await cache.get(
        asyncNames.totalTimeLeftTrueFalseMixed
      );
    } else if (categoryId == "c1") {
      totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseOne);
    } else if (categoryId == "c2") {
      totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseTwo);
    } else if (categoryId == "c3") {
      totalTimeLeft_Str = await cache.get(
        asyncNames.totalTimeLeftTrueFalseThree
      );
    } else if (categoryId == "c4") {
      totalTimeLeft_Str = await cache.get(
        asyncNames.totalTimeLeftTrueFalseFour
      );
    }
    let totalTimeLeft_Int = totalTimeLeft_Str;
    if (isNaN(totalTimeLeft_Int)) {
      totalTimeLeft_Int = 0;
    }
    setTotalTimeLeft(totalTimeLeft_Int);
  };

  timer && getTotalTimeLeftTrueFalse(categoryId, setTotalTimeLeft);

  const nextQuestion = async () => {
    setCorrectChoice(false);
    const str = timer ? "" : "NoTimer";

    updateNumOfTotalQuestionsMixed(
      gameType,
      numOfTotalQuestions,
      setNumOfTotalQuestions
    );

    // await getNumOfTotalQuestionsTrueFalse(
    //   categoryId,
    //   gameType,
    //   numOfTotalQuestions,
    //   setNumOfTotalQuestions,
    //   str
    // );

    getTotalPointsMulti(categoryId, setTotalPoints, "TrueFalse", timer);

    await updateRemainQuestionsTrueFalse(
      categoryId,
      gameType,
      numOfRemainQuestions,
      setNumOfRemainQuestions,
      str
    );

    setShowAnswer(false);
    setChoiceSave(false);
    setPlayCorrectAnimSound(false);
    setPlayWrongAnimSound(false);
    await cache.remove(asyncNames.noIsChosen);
    await cache.remove(asyncNames.yesIsChosen);

    // set num of q/s to finish stadium (100)
    if (numOfTotalQuestions === 100) {
      setStadiumIsFinished(true);
    }
  };
  return { nextQuestion, totalTimeLeft };
};
