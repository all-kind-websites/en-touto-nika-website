import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export default getTotalPointsMixed = async (
  totalPoints,
  setTotalPoints,
  gameType
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
