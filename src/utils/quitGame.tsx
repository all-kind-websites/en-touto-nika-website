import {
  removeAsyncMultiMixed,
  removeAsyncTrueFalseMixed,
  multipleChoiceRemoveAsync,
  noTimerRemoveAsync,
  trueFalseRemoveAsync,
  noTimerTrueFalseRemoveAsync,
} from "./removeAsync";

import nav from "../constants/nav";

const quitGame = (
  history: any,
  setNumOfTotalQuestions: Function,
  gameType: string,
  timer: boolean,
  categoryId: string
) => {
  const quit = async () => {
    if (categoryId === "MultiMixed") {
      await removeAsyncMultiMixed();
    } else if (categoryId === "TrueFalseMixed") {
      await removeAsyncTrueFalseMixed();
    } else if (gameType === "Multi" && timer) {
      await multipleChoiceRemoveAsync(categoryId);
    } else if (gameType === "Multi" && !timer) {
      await noTimerRemoveAsync(categoryId);
    } else if (gameType === "TrueFalse" && timer) {
      await trueFalseRemoveAsync(categoryId);
    } else if (gameType === "TrueFalse" && !timer) {
      await noTimerTrueFalseRemoveAsync(categoryId);
    }

    setNumOfTotalQuestions(0);
    history.push(nav.home); // call it here otherwise you get the finished round screen.
  };
  return { quit };
};
export default quitGame