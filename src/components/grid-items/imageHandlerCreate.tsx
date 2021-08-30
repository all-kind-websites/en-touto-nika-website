const jesus = "../../../assets/jesus-categories.jpg";
const theotokos = "../../../assets/panagia-glykofilousa-for-categories.jpg";
const john = "../../../assets/john-for-categories.jpg";

const chrisostomos = "../../../assets/chrisostomos.jpg";
const david = "../../../assets/david.jpg";
const agioipantes = "../../../assets/agioipantes.jpg";
const eksomologisi = "../../../assets/eksomologisi.jpg";


const imageHandlerCreate = (id: string) => {
  let image: string = jesus;
  let borderColor: string = "white";
  let borderWidth: number = 2;

  switch (id) {
    // For CreateWelcomeScreen
    case "cr1":
      image = theotokos;
      break;
    case "cr2":
      image = john;
      break;
    // For CreateMultiCategoriesScreen
    case "c1":
      image = chrisostomos;
      break;
    case "c2":
      image = david;
      break;
    case "c3":
      image = agioipantes;
      break;
    case "c4":
      image = eksomologisi;
      break;
    default:
      image = jesus;
      break;
  }
  return { borderColor, borderWidth, image };
};

export default imageHandlerCreate;
