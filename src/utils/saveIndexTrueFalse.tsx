import cache from "./cache";
import strings from "../constants/strings";

const saveIndexTrueFalse = async (categoryId: string, index: number, timer: string) => {
  // If mixed game is on
  if (!categoryId) timer = "Mixed";

  const savedIndex = await cache.get(`${strings.indexTrueFalse}${timer}`);
  // If there is already one, delete it before setting the next!
  if (!!savedIndex) {
    await cache.remove(`${strings.indexTrueFalse}${timer}`);
    await cache.set(
      `${strings.indexTrueFalse}${timer}`,
      index + 1 // + 1 to get next one...
    );
  } else {
    await cache.set(`${strings.indexTrueFalse}${timer}`, index + 1);
  }
};

export default saveIndexTrueFalse
