import {
  removeAsyncMultiMixed,
  removeAsyncTrueFalseMixed,
  multipleChoiceRemoveAsync,
  noTimerRemoveAsync,
  trueFalseRemoveAsync,
  noTimerTrueFalseRemoveAsync,
} from "./removeAsync.js";

import navNames from "../constants/navNames";

const quitGame = (
  navigation: any,
  setNumOfTotalQuestions: Function,
  gameType: string,
  withTimer: string,
  categoryId: string
) => {
  const quit = async () => {
    if (categoryId === "MultiMixed") {
      await removeAsyncMultiMixed();
    } else if (categoryId === "TrueFalseMixed") {
      await removeAsyncTrueFalseMixed();
    } else if (gameType === "Multi" && withTimer) {
      await multipleChoiceRemoveAsync(categoryId);
    } else if (gameType === "Multi" && !withTimer) {
      await noTimerRemoveAsync(categoryId);
    } else if (gameType === "TrueFalse" && withTimer) {
      await trueFalseRemoveAsync(categoryId);
    } else if (gameType === "TrueFalse" && !withTimer) {
      await noTimerTrueFalseRemoveAsync(categoryId);
    }

    setNumOfTotalQuestions(0);
    navigation.navigate(navNames.home); // call it here otherwise you get the finished round screen.
  };
  return { quit };
};
export default quitGame