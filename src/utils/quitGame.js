import React from "react";

import {
  removeAsyncMultiMixed,
  removeAsyncTrueFalseMixed,
  multipleChoiceRemoveAsync,
  noTimerRemoveAsync,
  trueFalseRemoveAsync,
  noTimerTrueFalseRemoveAsync,
} from "./removeAsync.js";
import navNames from "../constants/navNames/navNames";

export default quitGame = (
  navigation,
  setNumOfTotalQuestions,
  gameType,
  withTimer,
  categoryId
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
    navigation.navigate(navNames.welcome); // call it here otherwise you get the finished round screen.
  };
  return { quit };
};
