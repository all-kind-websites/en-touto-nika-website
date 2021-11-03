import colors from "../../constants/colors";
import strings from "../../constants/strings";
import { store } from "../../store/configureStore";

const jesus = "assets/jesus-categories.jpg";

const imageHandler = () => {

  const gameType = store.getState().game.id;
  const timer = store.getState().game.timer;

  let gameOn;

  const color: string = colors.cyan;
  let image: string = jesus;
  let borderColor: string = "white";
  let borderWidth: number = 2;


  if (gameType === "Multi") {
    if (timer) {
      gameOn = localStorage.getItem(strings.mixGameIsOnMulti);
    } else {
      gameOn = localStorage.getItem(strings.mixGameIsOnMultiNoTimer);
    }
  } else if (gameType === "TrueFalse") {
    if (timer) {
      gameOn = localStorage.getItem(strings.mixGameIsOnTrueFalse);
    } else {
      gameOn = localStorage.getItem(strings.mixGameIsOnTrueFalseNoTimer);
    }
  }

  if (gameOn) {
    borderColor = color;
    borderWidth = 4;
  }

  return { borderColor, borderWidth, image };
};

export default imageHandler;