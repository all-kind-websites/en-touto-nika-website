import cache from "./cache";

export default checkAnswer = async (
  answerIsCorrect,
  totalPoints,
  categoryId,
  type,
  timer
) => {
  let newTotalPoints = totalPoints;
  if (answerIsCorrect) {
    newTotalPoints += 1;
  }
  timer ? (timer = "") : (timer = "NoTimer");
  if (newTotalPoints > 0) {
    if (categoryId == "c1") {
      await cache.remove(`totalPoints${type}One${timer}`);
      await cache.set(`totalPoints${type}One${timer}`, newTotalPoints);
    }
    if (categoryId == "c2") {
      await cache.remove(`totalPoints${type}Two${timer}`);
      await cache.set(`totalPoints${type}Two${timer}`, newTotalPoints);
    }
    if (categoryId == "c3") {
      await cache.remove(`totalPoints${type}Three${timer}`);
      await cache.set(`totalPoints${type}Three${timer}`, newTotalPoints);
    }
    if (categoryId == "c4") {
      await cache.remove(`totalPoints${type}Four${timer}`);
      await cache.set(`totalPoints${type}Four${timer}`, newTotalPoints);
    }
  }
};
