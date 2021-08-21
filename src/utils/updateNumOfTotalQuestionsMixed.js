import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export default updateNumOfTotalQuestionsMixed = async (
  gameType,
  numOfTotalQuestions,
  setNumOfTotalQuestions
) => {
  let numOfTotQ = 0;
  let newValue = 0;

  gameType === "Multi"
    ? (numOfTotQ = await cache.get(asyncNames.numOfTotQuestionsMultiMixed))
    : (numOfTotQ = await cache.get(asyncNames.numOfTotQuestionsTrueFalseMixed));
  console.log("updateNumOfTotalQuestionsMixed", numOfTotalQuestions, numOfTotQ);
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

const saveMulti = async (value) => {
  console.log("saveMulti ", value);
  await cache.remove(asyncNames.numOfTotQuestionsMultiMixed);
  await cache.set(asyncNames.numOfTotQuestionsMultiMixed, String(value));
};

const saveTrueFalse = async (newValue) => {
  await cache.remove(asyncNames.numOfTotQuestionsTrueFalseMixed);
  await cache.set(asyncNames.numOfTotQuestionsTrueFalseMixed, String(newValue));
};

const saveCache = async (gameType, value) => {
  if (gameType == "Multi") {
    saveMulti(value);
  } else {
    saveTrueFalse(value);
  }
};
