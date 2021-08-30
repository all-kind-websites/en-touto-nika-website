import colors from "../../constants/colors";

const jesus = "../../../assets/jesus-categories.jpg";
// const theotokos = "../../../assets/panagia-glykofilousa-for-categories.jpg";
// const john = "../../../assets/john-for-categories.jpg";

const chrisostomos = "../../../assets/chrisostomos.jpg";
const david = "../../../assets/david.jpg";
const agioipantes = "../../../assets/agioipantes.jpg";
const eksomologisi = "../../../assets/eksomologisi.jpg";


const imageHandlerGame = (gamesStatus: any, id: string, timer: boolean) => {
  const color = colors.cyan;
  let image = jesus;
  let borderColor = "white";
  let borderWidth = 2;
  let shadowColor = colors.moccasin_light;

  const adjustBorderColor = (gameOn: boolean) => {
    if (gameOn) {
      borderColor = color;
      borderWidth = 4;
    }
  };
  switch (id) {
    case "c1":
      image = chrisostomos;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsMultiOne
          : gamesStatus.questionsMultiOneNoTimer
      );
      break;
    case "c2":
      image = david;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsMultiTwo
          : gamesStatus.questionsMultiTwoNoTimer
      );
      break;
    case "c3":
      image = agioipantes;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsMultiThree
          : gamesStatus.questionsMultiThreeNoTimer
      );
      break;
    case "c4":
      image = eksomologisi;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsMultiFour
          : gamesStatus.questionsMultiFourNoTimer
      );
      break;
    default:
      break;
  }
  return { borderColor, borderWidth, image, shadowColor };
};

export default imageHandlerGame;