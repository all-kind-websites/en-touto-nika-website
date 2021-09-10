import cache from "./cache";
import strings from "../constants/strings";

export const multipleChoiceRemoveAsync = async (categoryId: string) => {
  if (categoryId === "c1") {
    await localStorage.removeItem(strings.questionsMultiOne);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiOne);
    await localStorage.removeItem(strings.totalPointsMultiOne);
    await localStorage.removeItem(strings.totalTimeLeftMultiOne);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(strings.questionsMultiTwo);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiTwo);
    await localStorage.removeItem(strings.totalPointsMultiTwo);
    await localStorage.removeItem(strings.totalTimeLeftMultiTwo);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(strings.questionsMultiThree);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiThree);
    await localStorage.removeItem(strings.totalPointsMultiThree);
    await localStorage.removeItem(strings.totalTimeLeftMultiThree);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(strings.questionsMultiFour);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiFour);
    await localStorage.removeItem(strings.totalPointsMultiFour);
    await localStorage.removeItem(strings.totalTimeLeftMultiFour);
  }
  await localStorage.removeItem(strings.alfaIsTrueMulti);
  await localStorage.removeItem(strings.betaIsTrueMulti);
  await localStorage.removeItem(strings.gammaIsTrueMulti);
  await localStorage.removeItem(strings.deltaIsTrueMulti);
  await localStorage.removeItem(strings.lastQuestionSecondsMulti);
  await localStorage.removeItem(strings.lastQuestionMinutesMulti);
};

export const noTimerRemoveAsync = async (categoryId: string) => {
  if (categoryId === "c1") {
    await localStorage.removeItem(strings.questionsMultiOneNoTimer);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiOneNoTimer);
    await localStorage.removeItem(strings.totalPointsMultiOneNoTimer);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(strings.questionsMultiTwoNoTimer);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiTwoNoTimer);
    await localStorage.removeItem(strings.totalPointsMultiTwoNoTimer);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(strings.questionsMultiThreeNoTimer);
    await localStorage.removeItem(
      strings.numOfTotQuestionsMultiThreeNoTimer
    );
    await localStorage.removeItem(strings.totalPointsMultiThreeNoTimer);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(strings.questionsMultiFourNoTimer);
    await localStorage.removeItem(strings.numOfTotQuestionsMultiFourNoTimer);
    await localStorage.removeItem(strings.totalPointsMultiFourNoTimer);
  }
  await localStorage.removeItem(strings.alfaIsTrueMulti);
  await localStorage.removeItem(strings.betaIsTrueMulti);
  await localStorage.removeItem(strings.gammaIsTrueMulti);
  await localStorage.removeItem(strings.deltaIsTrueMulti);
};

export const trueFalseRemoveAsync = async (categoryId: string) => {
  if (categoryId === "c1") {
    await localStorage.removeItem(strings.questionsTrueFalseOne);
    await localStorage.removeItem(strings.numOfRemainQuestionsTrueFalseOne);
    await localStorage.removeItem(strings.numOfTotQuestionsTrueFalseOne);
    await localStorage.removeItem(strings.totalPointsTrueFalseOne);
    await localStorage.removeItem(strings.totalTimeLeftTrueFalseOne);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(strings.questionsTrueFalseTwo);
    await localStorage.removeItem(strings.numOfRemainQuestionsTrueFalseTwo);
    await localStorage.removeItem(strings.numOfTotQuestionsTrueFalseTwo);
    await localStorage.removeItem(strings.totalPointsTrueFalseTwo);
    await localStorage.removeItem(strings.totalTimeLeftTrueFalseTwo);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(strings.questionsTrueFalseThree);
    await localStorage.removeItem(
      strings.numOfRemainQuestionsTrueFalseThree
    );
    await localStorage.removeItem(strings.numOfTotQuestionsTrueFalseThree);
    await localStorage.removeItem(strings.totalPointsTrueFalseThree);
    await localStorage.removeItem(strings.totalTimeLeftTrueFalseThree);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(strings.questionsTrueFalseFour);
    await localStorage.removeItem(strings.numOfRemainQuestionsTrueFalseFour);
    await localStorage.removeItem(strings.numOfTotQuestionsTrueFalseFour);
    await localStorage.removeItem(strings.totalPointsTrueFalseFour);
    await localStorage.removeItem(strings.totalTimeLeftTrueFalseFour);
  }
  await localStorage.removeItem(strings.noIsChosen);
  await localStorage.removeItem(strings.yesIsChosen);
  await localStorage.removeItem(strings.questionsRightChoices);
  await localStorage.removeItem(strings.indexTrueFalse);
  await localStorage.removeItem(strings.lastQuestionSecondsTrueFalse);
  await localStorage.removeItem(strings.lastQuestionMinutesTrueFalse);
};

export const noTimerTrueFalseRemoveAsync = async (categoryId: string) => {
  console.log("noTimerTrueFalseRemoveAsync");
  if (categoryId === "c1") {
    await localStorage.removeItem(strings.questionsTrueFalseOneNoTimer);
    await localStorage.removeItem(
      strings.numOfTotQuestionsTrueFalseOneNoTimer
    );
    await localStorage.removeItem(
      strings.numOfRemainQuestionsTrueFalseOneNoTimer
    );
    await localStorage.removeItem(strings.totalPointsTrueFalseOneNoTimer);
  } else if (categoryId === "c2") {
    await localStorage.removeItem(strings.questionsTrueFalseTwoNoTimer);
    await localStorage.removeItem(
      strings.numOfRemainQuestionsTrueFalseTwoNoTimer
    );
    await localStorage.removeItem(
      strings.numOfTotQuestionsTrueFalseTwoNoTimer
    );
    await localStorage.removeItem(strings.totalPointsTrueFalseTwoNoTimer);
  } else if (categoryId === "c3") {
    await localStorage.removeItem(strings.questionsTrueFalseThreeNoTimer);
    await localStorage.removeItem(
      strings.numOfRemainQuestionsTrueFalseThreeNoTimer
    );
    await localStorage.removeItem(
      strings.numOfTotQuestionsTrueFalseThreeNoTimer
    );
    await localStorage.removeItem(strings.totalPointsTrueFalseThreeNoTimer);
  } else if (categoryId === "c4") {
    await localStorage.removeItem(strings.questionsTrueFalseFourNoTimer);
    await localStorage.removeItem(
      strings.numOfRemainQuestionsTrueFalseFourNoTimer
    );
    await localStorage.removeItem(
      strings.numOfTotQuestionsTrueFalseFourNoTimer
    );
    await localStorage.removeItem(strings.totalPointsTrueFalseFourNoTimer);
  }
  await localStorage.removeItem(strings.noIsChosen);
  await localStorage.removeItem(strings.yesIsChosen);
  await localStorage.removeItem(strings.questionsRightChoicesNoTimer);
  await localStorage.removeItem(strings.indexTrueFalseNoTimer);
};

// adjust strings like the above format
export const removeAsyncMultiMixed = async () => {
  console.log("removeAsyncMultiMixed");
  await localStorage.removeItem(strings.pointsTypeMultiMixed);
  await localStorage.removeItem(strings.questionsMultiMixed);
  await localStorage.removeItem(strings.mixGameIsOnMulti);
  await localStorage.removeItem(strings.mixGameIsOnMultiNoTimer);
  await localStorage.removeItem(strings.mixGameIsOnMultiNoTimer);
  await localStorage.removeItem(strings.numOfTotQuestionsMultiMixed);
  await localStorage.removeItem(strings.noIsChosen);
  await localStorage.removeItem(strings.yesIsChosen);
  await localStorage.removeItem(strings.useTimerMultiMixed); // from Categories
  // await localStorage.removeItem(strings.totalTimeLeftMultiMixed);
  await localStorage.removeItem(strings.lastQuestionSecondsMultiMixed);
  await localStorage.removeItem(strings.lastQuestionMinutesMultiMixed);
};

// adjust strings like the above format
export const removeAsyncTrueFalseMixed = async () => {
  console.log("removeAsyncTrueFalseMixed");
  await localStorage.removeItem(strings.pointsTypeTrueFalseMixed);
  await localStorage.removeItem(strings.questionsTrueFalseMixed);
  await localStorage.removeItem(strings.mixGameIsOnTrueFalse);
  await localStorage.removeItem(strings.mixGameIsOnTrueFalseNoTimer);
  await localStorage.removeItem(strings.mixedQuestionsAreOnTrueFalse);
  await localStorage.removeItem(strings.numOfRemainQuestionsTrueFalseMixed);
  await localStorage.removeItem(strings.numOfTotQuestionsTrueFalseMixed);
  await localStorage.removeItem(strings.noIsChosen);
  await localStorage.removeItem(strings.yesIsChosen);
  await localStorage.removeItem(strings.useTimerTrueFalseMixed); // from Categories
  await localStorage.removeItem(strings.totalTimeLeftTrueFalseMixed);
  await localStorage.removeItem(strings.lastQuestionSecondsTrueFalseMixed);
  await localStorage.removeItem(strings.lastQuestionMinutesTrueFalseMixed);
  await localStorage.removeItem(strings.indexTrueFalseMixed);
};

export const removeChoicesfromAsyncStorage = async () => {
  // Here we remove all choices.
  await cache.remove(strings.alfaIsTrueMultiMixed);
  await cache.remove(strings.betaIsTrueMultiMixed);
  await cache.remove(strings.gammaIsTrueMultiMixed);
  await cache.remove(strings.deltaIsTrueMultiMixed);

  await cache.remove(strings.alfaIsTrueMulti);
  await cache.remove(strings.betaIsTrueMulti);
  await cache.remove(strings.gammaIsTrueMulti);
  await cache.remove(strings.deltaIsTrueMulti);
};
