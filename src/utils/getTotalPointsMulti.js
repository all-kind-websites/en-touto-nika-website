import cache from "./cache";

export default getTotalPoints = async (
  categoryId,
  setTotalPoints,
  type,
  timer
) => {
  let totalPoints = 0;
  timer ? (timer = "") : (timer = "NoTimer");
  if (categoryId == "c1") {
    totalPoints = await cache.get(`totalPoints${type}One${timer}`);
  } else if (categoryId == "c2") {
    totalPoints = await cache.get(`totalPoints${type}Two${timer}`);
  } else if (categoryId == "c3") {
    totalPoints = await cache.get(`totalPoints${type}Three${timer}`);
  } else if (categoryId == "c4") {
    totalPoints = await cache.get(`totalPoints${type}Four${timer}`);
  }

  totalPoints > 0 && setTotalPoints(totalPoints);
};
