import colors from "../../constants/colors";

export interface GameStatusTrueFalse {
  questionsTrueFalseOne: boolean,
  questionsTrueFalseTwo: boolean,
  questionsTrueFalseThree: boolean,
  questionsTrueFalseFour: boolean,
  questionsTrueFalseOneNoTimer: boolean,
  questionsTrueFalseTwoNoTimer: boolean,
  questionsTrueFalseThreeNoTimer: boolean,
  questionsTrueFalseFourNoTimer: boolean,
}
const jesus = "../../../assets/jesus-categories.jpg";
// const theotokos = "../../../assets/panagia-glykofilousa-for-categories.jpg";
// const john = "../../../assets/john-for-categories.jpg";

const chrisostomos = "../../../assets/chrisostomos.jpg";
const david = "../../../assets/david.jpg";
const agioipantes = "../../../assets/agioipantes.jpg";
const eksomologisi = "../../../assets/eksomologisi.jpg";


const imageHandlerTrueFalse = (gamesStatus: any, id: string, timer: boolean) => {
  const color: string = colors.cyan;
  let image: string = jesus;
  let borderColor: string = "white";
  let borderWidth: number = 2;

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
          ? gamesStatus.questionsTrueFalseOne
          : gamesStatus.questionsTrueFalseOneNoTimer
      );
      break;
    case "c2":
      image = david;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsTrueFalseTwo
          : gamesStatus.questionsTrueFalseTwoNoTimer
      );
      break;
    case "c3":
      image = agioipantes;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsTrueFalseThree
          : gamesStatus.questionsTrueFalseThreeNoTimer
      );
      break;
    case "c4":
      image = eksomologisi;
      adjustBorderColor(
        timer
          ? gamesStatus.questionsTrueFalseFour
          : gamesStatus.questionsTrueFalseFourNoTimer
      );
      break;
    default:
      break;
  }
  return { borderColor, borderWidth, image };
};

export default imageHandlerTrueFalse;