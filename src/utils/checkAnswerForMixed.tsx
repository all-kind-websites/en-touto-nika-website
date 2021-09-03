import asynNames from "../constants/asyncNames";
import { store } from "../index";
import { savePoints } from "../store/actions/game";

const checkAnswerForMixed = async (answerIsCorrect: boolean, totalPoints: number) => {
  try {
    let newTotalPoints = totalPoints;
    if (answerIsCorrect) {
      newTotalPoints += 1;
    }
    store.dispatch(savePoints(newTotalPoints, asynNames.pointsTypeMultiMixed))
  } catch (err) {
    // send to custom analytics server
    throw err;
  }
};
export default checkAnswerForMixed