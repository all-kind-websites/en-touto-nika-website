import { store } from '../index';

import cache from "./cache";
import asyncNames from "../constants/asyncNames";

const getTotalPointsMixed = async (
  totalPoints: number,
  setTotalPoints: Function,
  gameType: string
) => {
  let storedTotalPoints = 0;

  gameType === "Multi"
    ? (storedTotalPoints = store.getState().game.pointsMultiMixed)
    : (storedTotalPoints = store.getState().game.pointsTrueFalseMixed);

  if (storedTotalPoints) {
    setTotalPoints(storedTotalPoints);
  } else {
    setTotalPoints(totalPoints);
  }
};

export default getTotalPointsMixed;