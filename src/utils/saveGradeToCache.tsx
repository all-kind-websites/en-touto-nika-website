import cache from "./cache";
import strings from "../constants/strings";

const saveGradeToCache = async (totalPoints: number) => {
  let sum = 0;
  let points = await cache.get(strings.savedPoints);
  if (!points) {
    await cache.set(strings.savedPoints, +totalPoints);
  } else if (!!points) {
    sum = +points + +totalPoints;
    await cache.remove(strings.savedPoints);
    cache.set(strings.savedPoints, +sum);
  }
};

export default saveGradeToCache;