import navNames from "../../constants/navNames";

import GridTile from "./GridTile";
import imageHandler from "./imageHandler";
import imageHandlerCreate from "./imageHandlerCreate";
import imageHandlerTrueFalse, { GameStatusTrueFalse } from "./imageHandlerTrueFalse";
// import { GameStatusMulti } from './imageHandler'

// gamesStatus: GameStatusMulti | GameStatusTrueFalse
interface CategoryGridTileProps {
  gamesStatus: any,
  id: string,
  navigationName: string,
  onClick: any,
  timer: boolean,
  title: string,
}

// interface Image {
//   borderColor: string | undefined,
//   borderWidth: number | undefined,
//   image: string | undefined,
//   shadowColor: string | undefined
// }
// NOTE:
// We have a separate CategoryGridTileNoTimer, because in case of error,
// CategoryGridTile, would get a gameOn in NoTimerMultiGameScreen.
const CategoryGridTile = ({
  gamesStatus,
  id,
  navigationName,
  onClick,
  timer,
  title,
}: CategoryGridTileProps) => {

  let borderC: string = '', borderW: number = 0, img: string = '';

  if (navigationName === navNames.multiGameWithTimer) {
    const { borderColor, borderWidth, image } = imageHandler(gamesStatus, id, timer);
    borderC = borderColor; borderW = borderWidth; img = image;
  }
  if (navigationName === navNames.trueFalseGameWithTimer) {
    const { borderColor, borderWidth, image } = imageHandlerTrueFalse(gamesStatus, id, timer);
    borderC = borderColor; borderW = borderWidth; img = image;

  }
  if (navigationName === navNames.createHome) {
    const { borderColor, borderWidth, image } = imageHandlerCreate(id);
    borderC = borderColor; borderW = borderWidth; img = image;
  }



  return (
    <GridTile
      borderColor={borderC}
      borderWidth={borderW}
      image={img}
      onClick={onClick}
      title={title}
    />
  );
};

export default CategoryGridTile;