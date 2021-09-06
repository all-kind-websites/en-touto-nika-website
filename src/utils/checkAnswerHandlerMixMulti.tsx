import asyncNames from "../constants/asyncNames";

import cache from "./cache";
import checkAnswerForMixed from "./checkAnswerForMixed";
import { Question } from '../models/question';

const checkAnswerHandlerMixedMulti = (
  selectedQuestion: Question | null,
  setChoiceColor: Function,
  setCorrectChoice: Function,
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
    if (alfaIsTrueMixed && +rightChoice === 1) {
      setCorrectChoice(true);
      setChoiceColor(asyncNames.correctChoiceColor);
      corChoice = true;
    } if (betaIsTrueMixed && +rightChoice === 2) {
      setCorrectChoice(true);
      setChoiceColor(asyncNames.correctChoiceColor);
      corChoice = true;
    } if (gammaIsTrueMixed && +rightChoice === 3) {
      setCorrectChoice(true);
      setChoiceColor(asyncNames.correctChoiceColor);
      corChoice = true;
    } if (deltaIsTrueMixed && +rightChoice === 4) {
      setCorrectChoice(true);
      setChoiceColor(asyncNames.correctChoiceColor);
      corChoice = true;
    }
    if (corChoice) {
      setTotalPoints(totalPoints + 1);

    }
    if (!corChoice) {
      setChoiceColor(asyncNames.wrongChoiceColor);
    }
    checkAnswerForMixed(corChoice, totalPoints);
  };

  return { saveAnswer };
};
export default checkAnswerHandlerMixedMulti;