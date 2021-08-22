import cache from "./cache";
import asyncNames from "../constants/asyncNames";

// Get time left to add it to the points.
const getTotalTimeLeft = async (categoryId: string, setTotalTimeLeft: Function) => {
  let totalTimeLeft_Str = "";
  // a mixed game is on => categoryId === undefined
  if (!categoryId) {
    totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseMixed);
  } else if (categoryId === "c1") {
    totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseOne);
  } else if (categoryId === "c2") {
    totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseTwo);
  } else if (categoryId === "c3") {
    totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseThree);
  } else if (categoryId === "c4") {
    totalTimeLeft_Str = await cache.get(asyncNames.totalTimeLeftTrueFalseFour);
  }
  let totalTimeLeft_Int = parseInt(totalTimeLeft_Str);
  if (isNaN(totalTimeLeft_Int)) {
    totalTimeLeft_Int = 0;
  }
  setTotalTimeLeft(totalTimeLeft_Int);
};
export default getTotalTimeLeft;