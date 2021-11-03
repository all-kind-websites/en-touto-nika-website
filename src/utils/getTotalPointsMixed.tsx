
import cache from "./cache";
import strings from "../constants/strings";
import { store } from "../store/configureStore";

const getTotalPointsMixed = async (
  totalPoints: number,
  setTotalPoints: Function,
  gameType: string
) => {
  let storedTotalPoints = 0;

  gameType === "Multi"
    ? (storedTotalPoints = store.getState().game.pointsMultiMixed)
    : (storedTotalPoints = store.getState().game.pointsTrueFalseMixed);

  if (storedTotalPoints) {
    setTotalPoints(storedTotalPoints);
  } else {
    setTotalPoints(totalPoints);
  }
};

export default getTotalPointsMixed;