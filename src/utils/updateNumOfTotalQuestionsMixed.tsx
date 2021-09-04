import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const updateNumOfTotalQuestionsMixed = async (
  gameType: string,
  numOfTotalQuestions: number,
  setNumOfTotalQuestions: Function
) => {
  let numOfTotQ = 0;
  let newValue = 0;

  gameType === "Multi"
    ? (numOfTotQ = await cache.get(asyncNames.numOfTotQuestionsMultiMixed))
    : (numOfTotQ = await cache.get(asyncNames.numOfTotQuestionsTrueFalseMixed));
  if (!!numOfTotQ) {
    newValue = +numOfTotQ + 1;
    setNumOfTotalQuestions(newValue);
    saveCache(gameType, newValue);
  } else {
    // newValue = numOfTotalQuestions + 1;
    // setNumOfTotalQuestions(newValue);
    saveCache(gameType, numOfTotalQuestions);
  }
};

const saveMulti = async (value: number) => {
  await cache.remove(asyncNames.numOfTotQuestionsMultiMixed);
  await cache.set(asyncNames.numOfTotQuestionsMultiMixed, String(value));
};

const saveTrueFalse = async (newValue: number) => {
  await cache.remove(asyncNames.numOfTotQuestionsTrueFalseMixed);
  await cache.set(asyncNames.numOfTotQuestionsTrueFalseMixed, String(newValue));
};

const saveCache = async (gameType: string, value: number) => {
  if (gameType === "Multi") {
    saveMulti(value);
  } else {
    saveTrueFalse(value);
  }
};
export default updateNumOfTotalQuestionsMixed;