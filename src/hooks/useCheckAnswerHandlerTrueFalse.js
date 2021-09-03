import { useCallback, useState } from "react";

import asyncNames from "../constants/asyncNames/asyncNames";

import cache from "../utils/cache";
import checkAnswer from "../utils/checkAnswer";

export default useCheckAnswerHandlerTrueFalse = (
  categoryId,
  index,
  questionTitle,
  setCorrectChoice,
  setModalVisible,
  setPlayCorrectAnimSound,
  setPlayWrongAnimSound,
  setTotalPoints,
  timer,
  totalPoints
) => {
  const [lastQuestion, setLastQuestion] = useState(false);
  const withOrWithoutTimer = timer ? "" : "NoTimer";

  let corChoice = false;
  const saveAnswer = async () => {
    const questionsRightChoices = await cache.get(
      `${asyncNames.questionsRightChoices}${withOrWithoutTimer}`
    );

    const questionRightChoice = questionsRightChoices.shift();

    await cache.remove(
      `${asyncNames.questionsRightChoices}${withOrWithoutTimer}`
    );
    await cache.set(
      `${asyncNames.questionsRightChoices}${withOrWithoutTimer}`,
      questionsRightChoices
    );
    const noIsChosen = await cache.get(asyncNames.noIsChosen);
    const yesIsChosen = await cache.get(asyncNames.yesIsChosen);

    if (noIsChosen && +questionRightChoice == 0 && yesIsChosen === null) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (
      yesIsChosen &&
      +questionRightChoice == 1 &&
      noIsChosen === null
    ) {
      setCorrectChoice(true);
      corChoice = true;
    } else {
      setCorrectChoice(false);
      corChoice = false;
    }

    if (corChoice) {
      setTotalPoints(totalPoints + 1);
      cache.set(asyncNames.pointsTypeTrueFalseMixed, String(totalPoints + 1));
      setPlayCorrectAnimSound(true);
      setTimeout(() => {
        setModalVisible(true);
        setPlayCorrectAnimSound(false);
      }, 2500);
    }
    if (!corChoice) {
      setPlayWrongAnimSound(true);
      setTimeout(() => {
        setModalVisible(true);
        setPlayWrongAnimSound(false);
      }, 2500);
    }
    await checkAnswer(corChoice, totalPoints, categoryId, "TrueFalse", timer);

    await cache.remove(asyncNames.noIsChosen);
    await cache.remove(asyncNames.yesIsChosen);

    if (index + 1 === questionTitle.length) {
      setLastQuestion(true);
    }
  };
  return { lastQuestion, saveAnswer };
};
