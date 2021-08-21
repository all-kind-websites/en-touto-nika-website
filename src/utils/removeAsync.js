import { AsyncStorage } from "react-native";
import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export const multipleChoiceRemoveAsync = async (categoryId) => {
  if (categoryId == "c1") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiOne);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiOne);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiOne);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftMultiOne);
  } else if (categoryId == "c2") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiTwo);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiTwo);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiTwo);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftMultiTwo);
  } else if (categoryId == "c3") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiThree);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiThree);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiThree);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftMultiThree);
  } else if (categoryId == "c4") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiFour);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiFour);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiFour);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftMultiFour);
  }
  await AsyncStorage.removeItem(asyncNames.alfaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.betaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.gammaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.deltaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.lastQuestionSecondsMulti);
  await AsyncStorage.removeItem(asyncNames.lastQuestionMinutesMulti);
};

export const noTimerRemoveAsync = async (categoryId) => {
  if (categoryId == "c1") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiOneNoTimer);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiOneNoTimer);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiOneNoTimer);
  } else if (categoryId == "c2") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiTwoNoTimer);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiTwoNoTimer);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiTwoNoTimer);
  } else if (categoryId == "c3") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiThreeNoTimer);
    await AsyncStorage.removeItem(
      asyncNames.numOfTotQuestionsMultiThreeNoTimer
    );
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiThreeNoTimer);
  } else if (categoryId == "c4") {
    await AsyncStorage.removeItem(asyncNames.questionsMultiFourNoTimer);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiFourNoTimer);
    await AsyncStorage.removeItem(asyncNames.totalPointsMultiFourNoTimer);
  }
  await AsyncStorage.removeItem(asyncNames.alfaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.betaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.gammaIsTrueMulti);
  await AsyncStorage.removeItem(asyncNames.deltaIsTrueMulti);
};

export const trueFalseRemoveAsync = async (categoryId) => {
  if (categoryId == "c1") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseOne);
    await AsyncStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseOne);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseOne);
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseOne);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftTrueFalseOne);
  } else if (categoryId == "c2") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseTwo);
    await AsyncStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseTwo);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseTwo);
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseTwo);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftTrueFalseTwo);
  } else if (categoryId == "c3") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseThree);
    await AsyncStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseThree
    );
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseThree);
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseThree);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftTrueFalseThree);
  } else if (categoryId == "c4") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseFour);
    await AsyncStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseFour);
    await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseFour);
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseFour);
    await AsyncStorage.removeItem(asyncNames.totalTimeLeftTrueFalseFour);
  }
  await AsyncStorage.removeItem(asyncNames.noIsChosen);
  await AsyncStorage.removeItem(asyncNames.yesIsChosen);
  await AsyncStorage.removeItem(asyncNames.questionsRightChoices);
  await AsyncStorage.removeItem(asyncNames.indexTrueFalse);
  await AsyncStorage.removeItem(asyncNames.lastQuestionSecondsTrueFalse);
  await AsyncStorage.removeItem(asyncNames.lastQuestionMinutesTrueFalse);
};

export const noTimerTrueFalseRemoveAsync = async (categoryId) => {
  console.log("noTimerTrueFalseRemoveAsync");
  if (categoryId == "c1") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseOneNoTimer);
    await AsyncStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseOneNoTimer
    );
    await AsyncStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseOneNoTimer
    );
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseOneNoTimer);
  } else if (categoryId == "c2") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseTwoNoTimer);
    await AsyncStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseTwoNoTimer
    );
    await AsyncStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseTwoNoTimer
    );
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseTwoNoTimer);
  } else if (categoryId == "c3") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseThreeNoTimer);
    await AsyncStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseThreeNoTimer
    );
    await AsyncStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseThreeNoTimer
    );
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseThreeNoTimer);
  } else if (categoryId == "c4") {
    await AsyncStorage.removeItem(asyncNames.questionsTrueFalseFourNoTimer);
    await AsyncStorage.removeItem(
      asyncNames.numOfRemainQuestionsTrueFalseFourNoTimer
    );
    await AsyncStorage.removeItem(
      asyncNames.numOfTotQuestionsTrueFalseFourNoTimer
    );
    await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseFourNoTimer);
  }
  await AsyncStorage.removeItem(asyncNames.noIsChosen);
  await AsyncStorage.removeItem(asyncNames.yesIsChosen);
  await AsyncStorage.removeItem(asyncNames.questionsRightChoicesNoTimer);
  await AsyncStorage.removeItem(asyncNames.indexTrueFalseNoTimer);
};

// adjust strings like the above format
export const removeAsyncMultiMixed = async () => {
  console.log("removeAsyncMultiMixed");
  await AsyncStorage.removeItem(asyncNames.totalPointsMultiMixed);
  await AsyncStorage.removeItem(asyncNames.questionsMultiMixed);
  await AsyncStorage.removeItem(asyncNames.mixGameIsOnMulti);
  await AsyncStorage.removeItem(asyncNames.mixGameIsOnMultiNoTimer);
  await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsMultiMixed);
  await AsyncStorage.removeItem(asyncNames.noIsChosen);
  await AsyncStorage.removeItem(asyncNames.yesIsChosen);
  await AsyncStorage.removeItem(asyncNames.useTimerMultiMixed); // from Categories
  await AsyncStorage.removeItem(asyncNames.totalTimeLeftMultiMixed);
  await AsyncStorage.removeItem(asyncNames.lastQuestionSecondsMultiMixed);
  await AsyncStorage.removeItem(asyncNames.lastQuestionMinutesMultiMixed);
};

// adjust strings like the above format
export const removeAsyncTrueFalseMixed = async () => {
  console.log("removeAsyncTrueFalseMixed");
  await AsyncStorage.removeItem(asyncNames.totalPointsTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.questionsTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.mixGameIsOnTrueFalse);
  await AsyncStorage.removeItem(asyncNames.mixGameIsOnTrueFalseNoTimer);
  await AsyncStorage.removeItem(asyncNames.mixedQuestionsAreOnTrueFalse);
  await AsyncStorage.removeItem(asyncNames.numOfRemainQuestionsTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.numOfTotQuestionsTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.noIsChosen);
  await AsyncStorage.removeItem(asyncNames.yesIsChosen);
  await AsyncStorage.removeItem(asyncNames.useTimerTrueFalseMixed); // from Categories
  await AsyncStorage.removeItem(asyncNames.totalTimeLeftTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.lastQuestionSecondsTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.lastQuestionMinutesTrueFalseMixed);
  await AsyncStorage.removeItem(asyncNames.indexTrueFalseMixed);
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
