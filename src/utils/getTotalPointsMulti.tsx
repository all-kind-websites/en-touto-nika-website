import cache from "./cache";

const getTotalPoints = async (
  categoryId: string,
  setTotalPoints: Function,
  type: string,
  timer: string
) => {
  let totalPoints = 0;
  timer ? (timer = "") : (timer = "NoTimer");
  if (categoryId === "c1") {
    totalPoints = await cache.get(`totalPoints${type}One${timer}`);
  } else if (categoryId === "c2") {
    totalPoints = await cache.get(`totalPoints${type}Two${timer}`);
  } else if (categoryId === "c3") {
    totalPoints = await cache.get(`totalPoints${type}Three${timer}`);
  } else if (categoryId === "c4") {
    totalPoints = await cache.get(`totalPoints${type}Four${timer}`);
  }

  totalPoints > 0 && setTotalPoints(totalPoints);
};
export default getTotalPoints;