import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const saveGradeToCache = async (totalPoints: number) => {
  let sum = 0;
  let points = await cache.get(asyncNames.savedPoints);
  if (!points) {
    await cache.set(asyncNames.savedPoints, +totalPoints);
  } else if (!!points) {
    sum = +points + +totalPoints;
    await cache.remove(asyncNames.savedPoints);
    cache.set(asyncNames.savedPoints, +sum);
  }
};

export default saveGradeToCache;