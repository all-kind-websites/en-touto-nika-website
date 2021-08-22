import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const getTotalPointsMixed = async (
  totalPoints: number,
  setTotalPoints: Function,
  gameType: string
) => {
  let storedTotalPoints = 0;
  gameType === "Multi"
    ? (storedTotalPoints = await cache.get(asyncNames.totalPointsMultiMixed))
    : (storedTotalPoints = await cache.get(
      asyncNames.totalPointsTrueFalseMixed
    ));

  if (storedTotalPoints) {
    setTotalPoints(+storedTotalPoints);
  } else {
    setTotalPoints(totalPoints);
  }
};

export default getTotalPointsMixed;