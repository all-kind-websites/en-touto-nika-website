import asyncNames from "../constants/asyncNames";

import cache from "./cache";
import checkAnswerForMixed from "./checkAnswerForMixed";
import { Question } from '../models/question';

const checkAnswerHandlerMixedMulti = (
  choiceSave: boolean,
  selectedQuestion: Question,
  setCorrectChoice: Function,
  setModalVisible: Function,
  setPlayCorrectAnimSound: Function,
  setPlayWrongAnimSound: Function,
  setTotalPoints: Function,
  totalPoints: number
) => {
  const saveAnswer = async () => {
    const alfaIsTrueMixed = await cache.get(asyncNames.alfaIsTrueMultiMixed);
    const betaIsTrueMixed = await cache.get(asyncNames.betaIsTrueMultiMixed);
    const gammaIsTrueMixed = await cache.get(asyncNames.gammaIsTrueMultiMixed);
    const deltaIsTrueMixed = await cache.get(asyncNames.deltaIsTrueMultiMixed);

    let rightChoice = 0;
    if (!!selectedQuestion) {
      rightChoice = selectedQuestion.right_choice; // for checking choice;
    }
    console.log(
      "Mixed",
      alfaIsTrueMixed,
      betaIsTrueMixed,
      gammaIsTrueMixed,
      deltaIsTrueMixed,
      rightChoice
    );

    let corChoice = false; // For checking the answer when dispatching the checkAnswerFor...
    if (alfaIsTrueMixed && rightChoice === 1) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (betaIsTrueMixed && rightChoice === 2) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (gammaIsTrueMixed && rightChoice === 3) {
      setCorrectChoice(true);
      corChoice = true;
    } else if (deltaIsTrueMixed && rightChoice === 4) {
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
    checkAnswerForMixed(corChoice, totalPoints);
  };

  return { saveAnswer };
};
export default checkAnswerHandlerMixedMulti;