import cache from "./cache";

const checkAnswer = async (
  answerIsCorrect: boolean,
  totalPoints: number,
  categoryId: string,
  type: string,
  timer: string
) => {
  let newTotalPoints = totalPoints;
  if (answerIsCorrect) {
    newTotalPoints += 1;
  }
  timer ? (timer = "") : (timer = "NoTimer");
  if (newTotalPoints > 0) {
    if (categoryId === "c1") {
      await cache.remove(`totalPoints${type}One${timer}`);
      await cache.set(`totalPoints${type}One${timer}`, newTotalPoints);
    }
    if (categoryId === "c2") {
      await cache.remove(`totalPoints${type}Two${timer}`);
      await cache.set(`totalPoints${type}Two${timer}`, newTotalPoints);
    }
    if (categoryId === "c3") {
      await cache.remove(`totalPoints${type}Three${timer}`);
      await cache.set(`totalPoints${type}Three${timer}`, newTotalPoints);
    }
    if (categoryId === "c4") {
      await cache.remove(`totalPoints${type}Four${timer}`);
      await cache.set(`totalPoints${type}Four${timer}`, newTotalPoints);
    }
  }
};
export default checkAnswer