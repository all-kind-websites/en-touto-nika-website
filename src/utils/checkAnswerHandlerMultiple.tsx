import asyncNames from "../constants/asyncNames";

import cache from "./cache";
import checkAnswer from "./checkAnswer";
import { Question } from '../models/question';

const checkAnswerHandlerMultiple = (
  categoryId: string,
  totalPoints: number,
  selectedQuestion: Question,
  setCorrectChoice: Function,
  setModalVisible: Function,
  setPlayCorrectAnimSound: Function,
  setPlayWrongAnimSound: Function,
  setTotalPoints: Function,
  timer: string
) => {
  let corChoice = false; // For checking the answer when dispatching the checkAnswerFor...
  const saveAnswer = async () => {
    // For triggering the alert messages
    const alfaIsTrueMulti = await cache.get(asyncNames.alfaIsTrueMulti);
    const betaIsTrueMulti = await cache.get(asyncNames.betaIsTrueMulti);
    const gammaIsTrueMulti = await cache.get(asyncNames.gammaIsTrueMulti);
    const deltaIsTrueMulti = await cache.get(asyncNames.deltaIsTrueMulti);
    let rightChoice = 0;
    if (!!selectedQuestion) {
      rightChoice = selectedQuestion.right_choice; // for checking choice;
    }
    console.log(
      "Multiple",
      alfaIsTrueMulti,
      betaIsTrueMulti,
      gammaIsTrueMulti,
      deltaIsTrueMulti,
      rightChoice
    );

    if (alfaIsTrueMulti === true && +rightChoice === 1) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (betaIsTrueMulti === true && +rightChoice === 2) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (gammaIsTrueMulti === true && +rightChoice === 3) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (deltaIsTrueMulti === true && +rightChoice === 4) {
      setCorrectChoice(true);
      corChoice = true;
    }
    if (corChoice) {
      setTotalPoints(totalPoints + 1);
      setPlayCorrectAnimSound(true);
      setTimeout(() => {
        setPlayCorrectAnimSound(false);
        setModalVisible(true);
      }, 2500);
    }
    if (!corChoice) {
      setPlayWrongAnimSound(true);
      setTimeout(() => {
        setPlayWrongAnimSound(false);
        setModalVisible(true);
      }, 2500);
    }
    await cache.remove(asyncNames.alfaIsTrueMulti);
    await cache.remove(asyncNames.betaIsTrueMulti);
    await cache.remove(asyncNames.gammaIsTrueMulti);
    await cache.remove(asyncNames.deltaIsTrueMulti);

    await checkAnswer(corChoice, totalPoints, categoryId, "Multi", timer);
  };

  return { saveAnswer };
};

export default checkAnswerHandlerMultiple;