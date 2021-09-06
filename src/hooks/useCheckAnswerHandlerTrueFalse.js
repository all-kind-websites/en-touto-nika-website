import { useCallback, useState } from "react";

import strings from "../constants/strings/strings";

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
      `${strings.questionsRightChoices}${withOrWithoutTimer}`
    );

    const questionRightChoice = questionsRightChoices.shift();

    await cache.remove(`${strings.questionsRightChoices}${withOrWithoutTimer}`);
    await cache.set(
      `${strings.questionsRightChoices}${withOrWithoutTimer}`,
      questionsRightChoices
    );
    const noIsChosen = await cache.get(strings.noIsChosen);
    const yesIsChosen = await cache.get(strings.yesIsChosen);

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
      cache.set(strings.pointsTypeTrueFalseMixed, String(totalPoints + 1));
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

    await cache.remove(strings.noIsChosen);
    await cache.remove(strings.yesIsChosen);

    if (index + 1 === questionTitle.length) {
      setLastQuestion(true);
    }
  };
  return { lastQuestion, saveAnswer };
};
