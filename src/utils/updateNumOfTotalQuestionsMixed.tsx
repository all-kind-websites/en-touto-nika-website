import cache from "./cache";
import strings from "../constants/strings";

const updateNumOfTotalQuestionsMixed = async (
  gameType: string,
  numOfTotalQuestions: number,
  setNumOfTotalQuestions: Function
) => {
  let numOfTotQ = 0;
  let newValue = 0;

  gameType === "Multi"
    ? (numOfTotQ = await cache.get(strings.numOfTotQuestionsMultiMixed))
    : (numOfTotQ = await cache.get(strings.numOfTotQuestionsTrueFalseMixed));
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
  await cache.remove(strings.numOfTotQuestionsMultiMixed);
  await cache.set(strings.numOfTotQuestionsMultiMixed, String(value));
};

const saveTrueFalse = async (newValue: number) => {
  await cache.remove(strings.numOfTotQuestionsTrueFalseMixed);
  await cache.set(strings.numOfTotQuestionsTrueFalseMixed, String(newValue));
};

const saveCache = async (gameType: string, value: number) => {
  if (gameType === "Multi") {
    saveMulti(value);
  } else {
    saveTrueFalse(value);
  }
};
export default updateNumOfTotalQuestionsMixed;