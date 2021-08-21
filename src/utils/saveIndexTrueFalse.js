import cache from "./cache";
import asyncNames from "../constants/asyncNames/asyncNames";

export default saveIndexTrueFalse = async (categoryId, index, timer) => {
  // If mixed game is on
  if (!categoryId) timer = "Mixed";

  const savedIndex = await cache.get(`${asyncNames.indexTrueFalse}${timer}`);
  // If there is already one, delete it before setting the next!
  if (!!savedIndex) {
    await cache.remove(`${asyncNames.indexTrueFalse}${timer}`);
    await cache.set(
      `${asyncNames.indexTrueFalse}${timer}`,
      index + 1 // + 1 to get next one...
    );
  } else {
    await cache.set(`${asyncNames.indexTrueFalse}${timer}`, index + 1);
  }
};
