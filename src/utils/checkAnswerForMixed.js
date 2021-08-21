import cache from "./cache";
import asynNames from "../constants/asyncNames/asyncNames";

export default checkAnswerForMixed = async (answerIsCorrect, totalPoints) => {
  try {
    let newTotalPoints = totalPoints;
    if (answerIsCorrect) {
      newTotalPoints += 1;
    }
    if (newTotalPoints > 0) {
      await cache.remove(asynNames.totalPointsMultiMixed);
    }
    await cache.set(asynNames.totalPointsMultiMixed, newTotalPoints);
  } catch (err) {
    // send to custom analytics server
    throw err;
  }
};
