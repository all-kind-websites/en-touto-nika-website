import colors from "../../constants/colors";

const jesus = "../../../assets/jesus-categories.jpg";

const imageHandler = () => {
  const color: string = colors.cyan;
  let image: string = jesus;
  let borderColor: string = "white";
  let borderWidth: number = 2;

  if (true) {
    borderColor = color;
    borderWidth = 4;
  }

  return { borderColor, borderWidth, image };
};

export default imageHandler;