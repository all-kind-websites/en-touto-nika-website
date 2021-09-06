import strings from "../constants/strings";

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
    const alfaIsTrueMulti = await cache.get(strings.alfaIsTrueMulti);
    const betaIsTrueMulti = await cache.get(strings.betaIsTrueMulti);
    const gammaIsTrueMulti = await cache.get(strings.gammaIsTrueMulti);
    const deltaIsTrueMulti = await cache.get(strings.deltaIsTrueMulti);
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
    await cache.remove(strings.alfaIsTrueMulti);
    await cache.remove(strings.betaIsTrueMulti);
    await cache.remove(strings.gammaIsTrueMulti);
    await cache.remove(strings.deltaIsTrueMulti);

    await checkAnswer(corChoice, totalPoints, categoryId, "Multi", timer);
  };

  return { saveAnswer };
};

export default checkAnswerHandlerMultiple;