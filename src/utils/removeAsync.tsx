import cache from "./cache";
import asyncNames from "../constants/asyncNames";

export const multipleChoiceRemoveAsync = async (categoryId: string) => {
  if (categoryId === "c1") {
    await localStorage.removeItem(asyncNames.questionsMultiOne);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiOne);
    await localStorage.removeItem(asyncNames.totalPointsMultiOne);
    await localStorage.removeItem(asyncNames.totalTimeLeftMultiOne);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(asyncNames.questionsMultiTwo);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiTwo);
    await localStorage.removeItem(asyncNames.totalPointsMultiTwo);
    await localStorage.removeItem(asyncNames.totalTimeLeftMultiTwo);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(asyncNames.questionsMultiThree);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiThree);
    await localStorage.removeItem(asyncNames.totalPointsMultiThree);
    await localStorage.removeItem(asyncNames.totalTimeLeftMultiThree);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(asyncNames.questionsMultiFour);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiFour);
    await localStorage.removeItem(asyncNames.totalPointsMultiFour);
    await localStorage.removeItem(asyncNames.totalTimeLeftMultiFour);
  }
  await localStorage.removeItem(asyncNames.alfaIsTrueMulti);
  await localStorage.removeItem(asyncNames.betaIsTrueMulti);
  await localStorage.removeItem(asyncNames.gammaIsTrueMulti);
  await localStorage.removeItem(asyncNames.deltaIsTrueMulti);
  await localStorage.removeItem(asyncNames.lastQuestionSecondsMulti);
  await localStorage.removeItem(asyncNames.lastQuestionMinutesMulti);
};

export const noTimerRemoveAsync = async (categoryId: string) => {
  if (categoryId === "c1") {
    await localStorage.removeItem(asyncNames.questionsMultiOneNoTimer);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiOneNoTimer);
    await localStorage.removeItem(asyncNames.totalPointsMultiOneNoTimer);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(asyncNames.questionsMultiTwoNoTimer);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiTwoNoTimer);
    await localStorage.removeItem(asyncNames.totalPointsMultiTwoNoTimer);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(asyncNames.questionsMultiThreeNoTimer);
    await localStorage.removeItem(
      asyncNames.numOfTotQuestionsMultiThreeNoTimer
    );
    await localStorage.removeItem(asyncNames.totalPointsMultiThreeNoTimer);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(asyncNames.questionsMultiFourNoTimer);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiFourNoTimer);
    await localStorage.removeItem(asyncNames.totalPointsMultiFourNoTimer);
  }
  await localStorage.removeItem(asyncNames.alfaIsTrueMulti);
  await localStorage.removeItem(asyncNames.betaIsTrueMulti);
  await localStorage.removeItem(asyncNames.gammaIsTrueMulti);
  await localStorage.removeItem(asyncNames.deltaIsTrueMulti);
};

export const trueFalseRemoveAsync = async (categoryId: string) => {
  if (categoryId === "c1") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseOne);
    await localStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseOne);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseOne);
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseOne);
    await localStorage.removeItem(asyncNames.totalTimeLeftTrueFalseOne);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseTwo);
    await localStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseTwo);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseTwo);
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseTwo);
    await localStorage.removeItem(asyncNames.totalTimeLeftTrueFalseTwo);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseThree);
    await localStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseThree
    );
    await localStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseThree);
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseThree);
    await localStorage.removeItem(asyncNames.totalTimeLeftTrueFalseThree);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseFour);
    await localStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseFour);
    await localStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseFour);
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseFour);
    await localStorage.removeItem(asyncNames.totalTimeLeftTrueFalseFour);
  }
  await localStorage.removeItem(asyncNames.noIsChosen);
  await localStorage.removeItem(asyncNames.yesIsChosen);
  await localStorage.removeItem(asyncNames.questionsRightChoices);
  await localStorage.removeItem(asyncNames.indexTrueFalse);
  await localStorage.removeItem(asyncNames.lastQuestionSecondsTrueFalse);
  await localStorage.removeItem(asyncNames.lastQuestionMinutesTrueFalse);
};

export const noTimerTrueFalseRemoveAsync = async (categoryId: string) => {
  console.log("noTimerTrueFalseRemoveAsync");
  if (categoryId === "c1") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseOneNoTimer);
    await localStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseOneNoTimer
    );
    await localStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseOneNoTimer
    );
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseOneNoTimer);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseTwoNoTimer);
    await localStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseTwoNoTimer
    );
    await localStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseTwoNoTimer
    );
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseTwoNoTimer);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseThreeNoTimer);
    await localStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseThreeNoTimer
    );
    await localStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseThreeNoTimer
    );
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseThreeNoTimer);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(asyncNames.questionsTrueFalseFourNoTimer);
    await localStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseFourNoTimer
    );
    await localStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseFourNoTimer
    );
    await localStorage.removeItem(asyncNames.totalPointsTrueFalseFourNoTimer);
  }
  await localStorage.removeItem(asyncNames.noIsChosen);
  await localStorage.removeItem(asyncNames.yesIsChosen);
  await localStorage.removeItem(asyncNames.questionsRightChoicesNoTimer);
  await localStorage.removeItem(asyncNames.indexTrueFalseNoTimer);
};

// adjust strings like the above format
export const removeAsyncMultiMixed = async () => {
  console.log("removeAsyncMultiMixed");
  await localStorage.removeItem(asyncNames.totalPointsMultiMixed);
  await localStorage.removeItem(asyncNames.questionsMultiMixed);
  await localStorage.removeItem(asyncNames.mixGameIsOnMulti);
  await localStorage.removeItem(asyncNames.mixGameIsOnMultiNoTimer);
  await localStorage.removeItem(asyncNames.numOfTotQuestionsMultiMixed);
  await localStorage.removeItem(asyncNames.noIsChosen);
  await localStorage.removeItem(asyncNames.yesIsChosen);
  await localStorage.removeItem(asyncNames.useTimerMultiMixed); // from Categories
  // await localStorage.removeItem(asyncNames.totalTimeLeftMultiMixed);
  await localStorage.removeItem(asyncNames.lastQuestionSecondsMultiMixed);
  await localStorage.removeItem(asyncNames.lastQuestionMinutesMultiMixed);
};

// adjust strings like the above format
export const removeAsyncTrueFalseMixed = async () => {
  console.log("removeAsyncTrueFalseMixed");
  await localStorage.removeItem(asyncNames.totalPointsTrueFalseMixed);
  await localStorage.removeItem(asyncNames.questionsTrueFalseMixed);
  await localStorage.removeItem(asyncNames.mixGameIsOnTrueFalse);
  await localStorage.removeItem(asyncNames.mixGameIsOnTrueFalseNoTimer);
  await localStorage.removeItem(asyncNames.mixedQuestionsAreOnTrueFalse);
  await localStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseMixed);
  await localStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseMixed);
  await localStorage.removeItem(asyncNames.noIsChosen);
  await localStorage.removeItem(asyncNames.yesIsChosen);
  await localStorage.removeItem(asyncNames.useTimerTrueFalseMixed); // from Categories
  await localStorage.removeItem(asyncNames.totalTimeLeftTrueFalseMixed);
  await localStorage.removeItem(asyncNames.lastQuestionSecondsTrueFalseMixed);
  await localStorage.removeItem(asyncNames.lastQuestionMinutesTrueFalseMixed);
  await localStorage.removeItem(asyncNames.indexTrueFalseMixed);
};

export const removeChoicesfromAsyncStorage = async () => {
  // Here we remove all choices.
  await cache.remove(asyncNames.alfaIsTrueMultiMixed);
  await cache.remove(asyncNames.betaIsTrueMultiMixed);
  await cache.remove(asyncNames.gammaIsTrueMultiMixed);
  await cache.remove(asyncNames.deltaIsTrueMultiMixed);

  await cache.remove(asyncNames.alfaIsTrueMulti);
  await cache.remove(asyncNames.betaIsTrueMulti);
  await cache.remove(asyncNames.gammaIsTrueMulti);
  await cache.remove(asyncNames.deltaIsTrueMulti);
};
